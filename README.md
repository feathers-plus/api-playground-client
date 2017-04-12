# api-playground-client

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs/api-playground-client.svg)](https://greenkeeper.io/)

[![Dependency Status](https://img.shields.io/david/feathersjs/api-playground-client.svg?style=flat-square)](https://david-dm.org/feathersjs/api-playground-client)
[![Download Status](https://img.shields.io/npm/dm/api-playground-client.svg?style=flat-square)](https://www.npmjs.com/package/api-playground-client)

> Feathers frontend client for BestBuy/api-playground

## Install the API server

You need to fork [BestBuy/api-playground](https://github.com/BestBuy/api-playground).
Follow its instructions to start the Best Buy API server.
Note the URL its listening to since it will be used for the API client.

## Installing and starting the Feathers client

`npm install -g http-server` installs a HTTP server to serve the static files in this repo.

Fork this repo,
[feathersjs/api-playground-client](https://github.com/feathersjs/api-playground-client),
into its own folder.

Change file `serverUrl.js` to point to the API server
if that's not listening to `localhost:3030`.

`cd public` and `http-server` starts our static file server using `to/the/repo/public` as root.
Note the URL its listening to.
This usually includes `localhost:8080`.

Point to `localhost:8080/rest.html` to run the client version which communicates with the
API server using REST HTTP protocals.

Point to `localhost:8080/socket.html` for the version which communicates using web sockets.

## Running the client

Select the Best Buy service you want to call.

Select the call method. Methods will have some of these parameters:

- `id` The identifier for the resource.
A resource is the data identified by a unique id.
A string must be quoted, a number not.
- `data` The resource data as a JavaScript object, e.g. `{ name: 'GiftIdeas' }`.
- `query` The query selector as a JavaScript object, e.g. `{ type: 'HardGood' }`.

Server responses appear in the `Results` section.

You can refer to the
[Feathers docs](https://docs.feathersjs.com/v/auk/services/readme.html)
for more information.

## Help

[Help](https://docs.feathersjs.com/v/auk/help/readme.html) is available.
You may find [Feathersjs Slack](https://feathersjs.slack.com/messages/help/) convenient.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
