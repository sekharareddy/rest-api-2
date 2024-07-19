const HTTP_CODES = require("http-codes");
const { ErrorResponse } = require("./ErrorResponse");
const utils = require("./utils");

const returnStateHandler = async function (returnState, req, res, next) {
  try {
    const { success } = returnState;
    if (success) {
      const body = utils.removeEmptyValueFromObject(returnState);
      return res.status(HTTP_CODES.OK).send(body);
    }
    if (returnState?.error?.message) { 
      returnState.error.message2 = returnState.error.message; 
    }
    // TODO Replace with App Error codes and error messages...
    return res.status(returnState.status).send(returnState);
  } catch (error) {
    console.log("Caught error. Sending error also now", error);
    const errResponse = new ErrorResponse(returnStateHandler.status, "Interval Server Error", false);
    next (errResponse);
  }
};

module.exports.returnStateHandler = returnStateHandler;
