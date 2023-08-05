function createCustomResponse(statusCode, content, token = null) {
  return {
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
    content: content,
    token: token,
  };
}

module.exports = createCustomResponse;
