const HTTP_CODES = require("http-codes");
const utils = require("./utils");

const returnStateHandler = async function (returnState, req, res, next) {
  console.log(5, returnState)
  try {
    if (returnState.success) {
      const body = utils.removeEmptyValueFromObject(returnState);
      return res.status(HTTP_CODES.OK).send(body);
    }
    // TODO Replace with App Error codes and error messages...
    return res.status(returnState.status).send(returnState?.error?.message);
  } catch (error) {
    console.log("Caught error. Sending error also now", error);
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err.message)
  }
};

module.exports.returnStateHandler = returnStateHandler;
