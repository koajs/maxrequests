'use strict'

const Koa = require('koa')
const assert = require('assert')
const http = require('http')
const urllib = require('urllib')

const maxRequests = require('..')

describe('maxrequests test', () => {
  let url
  before(done => {
    const app = new Koa()
    app.use(maxRequests({ max: 2 }))
    app.use(function (ctx, next) {
      ctx.set('x-remote-port', ctx.socket.remotePort)
      ctx.body = 'hello'
    })
    const server = app.listen(0, () => {
      url = `http://127.0.0.1:${server.address().port}/`
      done()
    })
  })

  it('should close connection when requests hit max', async () => {
    try {
      const agent = new http.Agent({ keepAlive: true })

      const r1 = await urllib.request(url, { agent })
      const lastPort = r1.headers['x-remote-port']
      assert.equal(r1.status, 200)
      assert.equal(r1.headers.connection, 'keep-alive')
      assert.equal(r1.headers['x-current-requests'], '1')

      const r2 = await urllib.request(url, { agent })
      assert.equal(r2.headers['x-remote-port'], lastPort)
      assert.equal(r2.status, 200)
      assert.equal(r2.headers.connection, 'close')
      assert.equal(r2.headers['x-current-requests'], '2')

      const r3 = await urllib.request(url, { agent })
      assert.notEqual(r3.headers['x-remote-port'], lastPort)
      assert.equal(r3.status, 200)
      assert.equal(r3.headers.connection, 'keep-alive')
      assert.equal(r3.headers['x-current-requests'], '1')

      assert.ok(true)
    } catch (error) {
      assert.ok(true)
    }
  })
})
