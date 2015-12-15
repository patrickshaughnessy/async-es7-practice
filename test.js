'use strict';

var request = require('request');

function getPerson(i) {
  var person;

  return new Promise(function(resolve, reject) {
    request(`http://swapi.co/api/people/${i}`, function(error, response, body) {
      person = JSON.parse(body);
      resolve(person);
    });
  })
}

async function main() {
  let people = [];

  for (let i = 1; i <= 87; i++) {
    let person = await getPerson(i);
    people.push({number: i, name: person.name});
    console.log('person', i, person.name);
  }
  console.log('people', people);
}

main();
console.log('fetching star wars people');
