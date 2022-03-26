## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a movie service api which fetch movie details from `omdbapi` with the given title.
	
## Technologies
Project is created with:
* Nodejs: 14.0
* mongodb: 4.4.3

## Run locally

1. Clone this repository
2. Create a .env file and copy the .env.example data to .env file 
3. Run from root dir

```
docker-compose up -d
```

By default the movie service will start on port `8000` and mongo db will run on 27017.
if you want you can change the default value by in env var.

`JWT_SECRET` must be matched with auth service
`OMDBAPIKEY` was taken from https://www.omdbapi.com/apikey.aspx. The given key is a free key


To stop the movie service run

```
docker-compose down
```

A json file of service named `movie-service-api.json` given in `service-doc/`. You can import it in your api testing application