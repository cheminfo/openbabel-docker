# openbabel-docker

Webservice allowing to convert between molecule formats using openbabel

## Installation

This project uses docker. After cloning the project you should do:

`docker-compose up --build -d`

This will start a webserver on port 3043 that will convert the query parameter 'tex' to a svg

For the browser you can test for example:

`http://localhost:20808/`

## Local developmwent

```
cd docker
docker build . -t openbabel
docker run -it openbabel bash
```

## License

[MIT](./LICENSE)

openbabel is subject to its own license.

```

```
