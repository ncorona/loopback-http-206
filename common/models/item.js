'use strict';

const fs = require('fs-extra');
const mime = require('mime-types');
const path = require('path');


module.exports = function(Item) {
  /**
   * Return the requested bytes of a specific file.
   *
   * @param {string} filename Name of the requested file
   * @param {Object} req HTTP request object with partial content headers
   * @params {Object} res HTTP response object with partial content headers
   * @params {function} next Callback function
   *
   * @returns {ReadStream} Returns the requested stream of bytes.
   */ 
  Item.download = function(filename, req, res, next) {
    console.log('Requested file', filename);
    const filepath = path.join(__dirname, '..', '..', 'client', 'assets', filename);

    fs.pathExists(filepath)
      // check for file existance
      .then(function(exist) {
        if (!exist) {
          let err = new Error();
          err.status = 404;
          err.name = 'File not found';
          err.message = 'File ' + filename + ' doesn\'t exist!';
          return Promise.reject(err);
        }
      })
      .then(function() {
        // extract file and request metadata
        const fileMime = mime.lookup(filepath);
        const fileSize = fs.statSync(filepath).size;
        const range = req.headers.range;

        let headers = {
          'Content-Type': fileMime,
          'Accept-Ranges': 'bytes',
          'Content-Length': fileSize,
        };
        
        // when file is requested using partial content
        if (range) {
          const temp = range.substr(6).split('-').map(parseInt);
          const start = temp[0];
          const end = temp[1] ? temp[1] : (fileSize - 1);
          const bytes = 'bytes ' + start + '-' + end + '/' + fileSize;
          
          headers['Content-Range'] = bytes;
          headers['Content-Length'] = end - start + 1;

          res.writeHead(206, headers);
          fs.createReadStream(filepath, {start, end}).pipe(res);
        }
        // return the entire file
        else {
          res.writeHead(200, headers);
          fs.createReadStream(filepath).pipe(res);
        }
      })
      .catch(next);
  };
  Item.remoteMethod('download', {
    http: {path: '/download/:filename', verb: 'get'},
    accepts: [
      {arg: 'filename', type: 'string', required: true},
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: {target: 'header'}},
    ],
  });
};
