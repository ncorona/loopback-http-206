## HTTP STREAMING

Project used to implement a HTTP 206 compatible endpoint using Loopback.
It could be createad also using a NodeJS standalone server.

A multimedia file, like a video, can be streamed in chuncks to a remote client (like a JS player inside a browser).
The client can retrieve any exisitng file from any point (and in chuncks).

### How to install

Just install dependencies and start the server:

```bash
npm install
npm start
```


### How to use it

You could access to all files stored inside the _client/_ folder.
To see video files and the working streaming you can access the browser at localhost:3000/

