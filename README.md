# maxrequests

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

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

Limit max requests on each http keepalive connection.

## Install

```bash
$ npm install koa-maxrequests
```

## Usage

```js
const maxrequests = require('koa-maxrequests');
const koa = require('koa');

const app = koa();
app.use(maxrequests({
  max: 1000,
}));
```

## License

[MIT](LICENSE.txt)
