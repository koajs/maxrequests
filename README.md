# maxRequests

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

Limit max requests on each http keepalive connection.


## Install

```bash
# npm
$ npm install koa-maxrequests
# yarn
$ yarn add koa-maxrequests
```


## Usage

```js
const Koa = require('koa');
const maxRequests = require('koa-maxrequests');

const app = new Koa();
app.use(maxrequests({
  // if keepalive socket hit max requests, response
  // will set `Connection: close` header.
  max: 1000
}));
```


## Contributors

| Name              | Website                           |
| ----------------- | --------------------------------- |
| **fengmk2**       | <https://fengmk2.com/>            |
| **Imed Jaberi**   | <https://www.3imed-jaberi.com/>   |


## License

[MIT](LICENSE)


##

[npm-image]: https://img.shields.io/npm/v/koa-maxrequests.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-maxrequests
[travis-image]: https://img.shields.io/travis/koajs/maxrequests.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/maxrequests
[codecov-image]: https://codecov.io/gh/koajs/maxrequests/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/koajs/maxrequests
[david-image]: https://img.shields.io/david/koajs/maxrequests.svg?style=flat-square
[david-url]: https://david-dm.org/koajs/maxrequests
[snyk-image]: https://snyk.io/test/npm/koa-maxrequests/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/koa-maxrequests
[download-image]: https://img.shields.io/npm/dm/koa-maxrequests.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-maxrequests
