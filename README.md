# LOOPBACK HTTP 206

Project used to implement a HTTP 206 compatible endpoint using Loopback.

## Getting Started

This small project has been created to allow the streaming of large multimedia files (e.g. videos) to remote clients (like a JS player inside a browser) returning only the requested chunks of a file.
The files are stored in the _client/assets_ folder of your filesystem and could be explored in different ways thanks to the partial content method.
The web application will be started with a API explorer at (http://localhost:3000/explorer).

### Prerequisites

In order to execute this web application you will need one of these technologies:
* _NodeJS (https://nodejs.org)_
* _Docker (https://www.docker.com)_.

### Installing & deployment

If you want to run the application on your machine you have to download/install the NodeJS with the following command:

```bash
bash run.sh
```

If you want to run the application using Docker, you have to run the following command on your bash interpreter:

```bash
docker run -it -v $PWD/client/assets:/code/client/assets -p 3000:3000 ncorona/loopback-http-206
```

Both commands will install all dependencies, start the web server and print the log on your console. The web application will be reacheable at (http://localhost:3000).

PS: in both cases the considered files are stored inside the client/assets folder, that is empty when you clone the repository. Add some sample videos to test the REST API (http://localhost:3000/explorer).


## Built With

* [Loopback](https://loopback.io) - The Node.js API Framework


## Contributing

Feel free to suggest any improvement or add new features.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


## Acknowledgments

This project has been created taking inspiration for other developers' code - see the [CREDITS.md](CREDITS.md) file for details.
