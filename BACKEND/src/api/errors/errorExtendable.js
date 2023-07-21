/**
 * @extends Error
 */
class ErrorExtendable extends Error {
    constructor({
      message,
      status,
      stack,
    }) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      this.status = status;
      this.stack = stack;
    }
  }
  
  module.exports = ErrorExtendable;
  