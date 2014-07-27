# no-more-lies

[![NPM version](https://badge.fury.io/js/no-more-lies.svg)](http://badge.fury.io/js/no-more-lies)

no-more-lies is a Javascript normaliser for user input from web forms, APIs, etc.

## Requirements

- [Node.js][]
- [mocha][] (To run tests)

[Node.js]: http://nodejs.org/
[mocha]: http://visionmedia.github.io/mocha/

## Installation

```sh
npm install no-more-lies
```

## Run Tests

```sh
mocha
```

## Usage

```js
var NoMoreLies = require('no-more-lies');

var noMoreLies = new NoMoreLies({
  name: 'string',
  username: {
    type: 'string',
    max: 20
  },
  age: 'int',
  postsPerPage: {
    type: 'int',
    min: 10,
    max: 50
  }
});

var normalised = noMoreLies.normalise({
  name: 123,
  username: 'averylonglonglongusername',
  age: '25',
  postsPerPage: '9'
});

/* normalised contains:

  {
    name: '123',
    username: 'averylonglonglonguse',
    age: 25,
    postsPerPage: 10
  }

*/
```
