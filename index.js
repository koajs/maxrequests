'use strict';

const requests = Symbol('requests');

module.exports = options => {
  options = options || {};
  options.max = options.max || 1000;
  return function* maxrequests(next) {
    const socket = this.socket;
    if (!socket) {
      return yield next;
    }
    socket[requests] = (socket[requests] || 0) + 1;
    this.set('X-Current-Requests', socket[requests]);
    if (socket[requests] >= options.max) {
      this.set('Connection', 'close');
    }
    yield next;
  };
};
