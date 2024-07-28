class QueryResult {
  constructor(data=null, success = true, error = null, total = null, count = null, start = null) {
    this.total = total;
    this.count = count;
    this.start = start;
    this.data = data;
    this.success = success;
    this.error = error
    this.status = error?.status
  }
}

exports.QueryResult = QueryResult;
