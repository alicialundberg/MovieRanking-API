# RateTheMovie-API
Mashup of two API's to create a personal movie database with CouchDB. 
The search function gets JSON data from IMDB API (unofficial API) and send the converted data to the server that are hosted on a Raspberry Pi. The server saves the data into the local database, PouchDB, and then sends the data to CouchDB. 

Scraper.js is a module that scrapes data from IMDB and send it to the API (server.js).

Stream.js is a module that scrapes data from MovieZine and send it to the API (server.js).
