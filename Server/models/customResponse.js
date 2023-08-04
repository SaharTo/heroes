function createCustomResponse(statusCode, content) {
  return {
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
    content: content,
  };
}

module.exports = createCustomResponse;
