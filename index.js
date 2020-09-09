'use strict'

const requests = Symbol('requests')

/**
 * maxRequests middleware.
 *
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */
module.exports = function (options = { max: 1000 }) {
  return async function maxRequests (ctx, next) {
    const { socket } = ctx

    if (!socket) {
      return await next()
    }

    socket[requests] = (socket[requests] || 0) + 1
    ctx.set('X-Current-Requests', socket[requests])

    if (socket[requests] >= options.max) {
      ctx.set('Connection', 'close')
    }

    await next()
  }
}
