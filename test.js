'use strict';

var request = require('request');

// function getPerson(i) {
//   var person;
//
//   return new Promise(function(resolve, reject) {
//     request(`http://swapi.co/api/people/${i}`, function(error, response, body) {
//       person = JSON.parse(body);
//       resolve(person);
//     });
//   })
// }
//
// async function main() {
//   let people = [];
//
//   for (let i = 1; i <= 87; i++) {
//     let person = await getPerson(i);
//     people.push({number: i, name: person.name});
//     console.log('person', i, person.name);
//   }
//   console.log('people', people);
// }
//
// main();
// console.log('fetching star wars people');

function getPeoplePage(page) {
  var people;
  var next;

  var url = page || "http://swapi.co/api/people/";

  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      var data = JSON.parse(body);
      people = data.results.map(person => person.name);
      next = data.next
      resolve({people: people, next: next});
    });
  })
}

async function main() {
  var allPeople = [];

  async function getPeople(page){
    var {people, next} = await getPeoplePage(page)
    allPeople = allPeople.concat(people);
    if (next){
      getPeople(next);
    } else {
      // no more pages - return all people;
      console.log(allPeople);
    }
  }
  
  getPeople();
}

main();
console.log('fetching star wars people');
