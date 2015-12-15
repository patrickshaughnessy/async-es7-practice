'use strict';

var request = require('request');

function getPerson() {
  var person;

  return new Promise(function(resolve, reject) {
    request('http://swapi.co/api/people/1', function(error, response, body) {
      person = body;
      resolve(person);
    });
  })
}

async function main() {
  var person = await getPerson();
  console.log(person);
}

main();
console.log('this should be first');
