'use strict';

const urllib = require('urllib');
const koa = require('koa');
const assert = require('assert');
const http = require('http');
const maxrequests = require('..');

describe('maxrequests test', () => {
  let url;
  before(done => {
    const app = koa();
    app.use(maxrequests({
      max: 2,
    }));
    app.use(function* () {
      this.set('x-remote-port', this.socket.remotePort);
      this.body = 'hello';
    });
    const server = app.listen(0, () => {
      url = `http://127.0.0.1:${server.address().port}/`;
      done();
    });
  });

  it('should close connection when requests hit max', done => {
    const agent = new http.Agent({
      keepAlive: true,
    });
    urllib.request(url, { agent }).then(r => {
      const lastPort = r.headers['x-remote-port'];
      assert.equal(r.status, 200);
      assert.equal(r.headers.connection, 'keep-alive');
      assert.equal(r.headers['x-current-requests'], '1');

      urllib.request(url, { agent }).then(r => {
        assert.equal(r.headers['x-remote-port'], lastPort);
        assert.equal(r.status, 200);
        assert.equal(r.headers.connection, 'close');
        assert.equal(r.headers['x-current-requests'], '2');

        // use new socket again
        urllib.request(url, { agent }).then(r => {
          assert.notEqual(r.headers['x-remote-port'], lastPort);
          assert.equal(r.status, 200);
          assert.equal(r.headers.connection, 'keep-alive');
          assert.equal(r.headers['x-current-requests'], '1');
          done();
        }).catch(done);
      }).catch(done);
    }).catch(done);
  });
});
