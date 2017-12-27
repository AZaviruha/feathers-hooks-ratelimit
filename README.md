# feathers-hooks-ratelimit

Feathers hook for requests rate-limiting. Uses [fast-ratelimit][fast-ratelimit].

## Install

```shell
yarn add feathers-hooks-ratelimit
```

or

```shell
npm i feathers-hooks-ratelimit --save
```

## Usage

```js
const rateLimit = require('feathers-hooks-ratelimit');

const config = {
  threshold: 20,           // available tokens over timespan
  ttl: 60                  // time-to-live value of token bucket (in seconds)
  userIdKey: 'user_id',    // used for request namespacing
  errorMessage: 'Too many requests. Please, try later.',
};

// And then just use it in your service's hooks.
myService.before({
  all: [
      rateLimit(config)
  ]
});
```

## Options

### config.namespace

[fast-ratelimit][fast-ratelimit] uses namespaces to distinguish requests from different consumers.
So you need to specify this value.

Or you can specify `config.userIdKey` if you want to use unique user id as a namespace.

### config.userIdKey

See `config.namespace`.

### config.threshold

See [fast-ratelimit][fast-ratelimit] docs.

### config.ttl

See [fast-ratelimit][fast-ratelimit] docs.

### config.errorMessage (optional)

Used as `message` for [@feathersjs/errors][@feathersjs/errors] `TooManyRequests` error.

### config.errorData (optional)

Used as `data` for [@feathersjs/errors][@feathersjs/errors] `TooManyRequests` error.



[fast-ratelimit]: https://github.com/valeriansaliou/node-fast-ratelimit
[@feathersjs/errors]: https://github.com/feathersjs/errors