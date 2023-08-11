/**
 * @extends Error
 */
class ErrorExtendable extends Error {
    constructor({
      message,
      code,
      stack,
    }) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      this.code = code;
      this.stack = stack;
    }
  }
  
  module.exports = ErrorExtendable;
  