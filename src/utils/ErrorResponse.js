class ErrorResponse {
  constructor(errorCode, errorInfo, errorData = {}, success = false, message = null) {
    this.errorCode = errorCode;
    this.errorInfo = errorInfo;
    this.success = success;
    this.detailedMessage = message;
    this.errorData = errorData;
    this.status = errorCode;
  }
}

exports.ErrorResponse = ErrorResponse;
