const httpStatus = require('http-status');
const ErrorExtendable = require('./errorExtendable');

/**
 * API error.
 * @extends ErrorExtendable
 */
class APIError extends ErrorExtendable {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code.
   */
  constructor({
    message,
    stack,
    code = httpStatus.INTERNAL_SERVER_ERROR,
  }) {
    super({
      message, stack, code
    });
  }
}

module.exports = APIError;
