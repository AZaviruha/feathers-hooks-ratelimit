const FastRateLimit = require('fast-ratelimit').FastRateLimit;
const errors = require('@feathersjs/errors');

module.exports = function(options = {}) {
  const { threshold, ttl, namespace, userIdKey, errorMessage, errorData } = options;
  const messageLimiter = new FastRateLimit({ threshold, ttl });

  return async context => {
    if(context.params.provider == null) {
      return context
    }
    let _namespace;

    if (namespace) {
      _namespace = namespace;
    } else {
      const user = context.params.user;
      _namespace = user ? user[userIdKey] : 'default';
    }

    try {
      await messageLimiter.consume(_namespace);
    } catch (e) {
      throw new errors.TooManyRequests(errorMessage || 'Too many requests', errorData);
    }

    return context;
  };
};
