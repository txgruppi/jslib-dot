# Dot notation setter and getter

[![Build Status](https://travis-ci.org/txgruppi/jslib-dot.png?branch=master)](https://travis-ci.org/txgruppi/jslib-dot)
[![Code Climate](https://codeclimate.com/github/txgruppi/jslib-dot.png)](https://codeclimate.com/github/txgruppi/jslib-dot)

Simple way to set/get values using dot notation

## Usage

### Setter

```js
var dot = require('jslib-dot');
var doc = {};
dot.set(doc, 'user.firstName', 'Tarcisio');
dot.set(doc, 'user.lastName', 'Gruppi');
console.log(doc); // {user: {firstName: "Tarcísio", lastName: "Gruppi"}}
```

```js
var dot = require('jslib-dot');
var doc = {};
dot.set(doc, 'languages.0.name', 'JavaScript');
dot.set(doc, 'languages.1.name', 'Go');
console.log(doc); // {languages:[{name:"JavaScript"},{name:"Go"}]}
```

### Getter

```js
var dot = require('jslib-dot');
var doc = {
  username: 'txgruppi',
  repos: [
    { name: 'jslib-dot', language: 'JavaScript' },
    { name: 'site', language: 'Go' },
    { name: 'node-gs-dl', language: 'JavaScript' },
    { name: 'c-maze-gen', language: 'C' },
    { name: 'fw', language: 'PHP' },
  ]
};
console.log(dot.get(doc, 'username')); // 'txgruppi'
console.log(dot.get(doc, 'repos'));
// [
//   { name: 'jslib-dot', language: 'JavaScript' },
//   { name: 'site', language: 'Go' },
//   { name: 'c-maze-gen', language: 'C' },
//   { name: 'fw', language: 'PHP' }
// ]
console.log(dot.get(doc, 'repos.$.name'));
// [
//   'jslib-dot',
//   'site',
//   'node-gs-dl',
//   'c-maze-gen',
//   'fw'
// ]
console.log(dot.get(doc, 'repos.$.language'));
// [
//   'JavaScript',
//   'Go',
//   'JavaScript',
//   'C',
//   'PHP'
// ]
```
