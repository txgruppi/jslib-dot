# Dot notation setter and getter

Simple way to set/get values using dot notation

## Usage

### Setter

```js
var dot = require('jslib-dot');
var doc = {};
dot.set(doc, 'user.firstName, 'Tarcísio');
dot.set(doc, 'user.lastName', 'Gruppi');
console.log(doc); // {user: {firstName: "Tarcísio", lastName: "Gruppi"}}
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
