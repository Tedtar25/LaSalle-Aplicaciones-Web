const careers = require('./careers');
const subjects = require('./subjects');

const students = [
  { id: 1, name: 'Emiliano Ramirez Ayala', career: careers[0], age: 18, gender: 'Male', subject01: subjects[0].name, subject02: subjects[1].name, subject03: subjects[2].name },
  { id: 2, name: 'David Fonseca Marin', career: careers[1], age: 20, gender: 'Male', subject01: subjects[2].name, subject02: subjects[3].name, subject03: subjects[4].name },
  { id: 3, name: 'Cesar Alberto Carillo Paez', career: careers[2], age: 27, gender: 'Male', subject01: subjects[6].name, subject02: subjects[5].name, subject03: subjects[0].name },
  { id: 4, name: 'Alvaro Emiliano Mora Lerma', career: careers[3], age: 20, gender: 'Male', subject01: subjects[2].name, subject02: subjects[1].name, subject03: subjects[7].name },
  { id: 5, name: 'Roberto Gomez', career: careers[2], age: 20, gender: 'Male', subject01: subjects[0].name, subject02: subjects[2].name, subject03: subjects[9].name },
  { id: 6, name: 'Julian Ramirez', career: careers[0], age: 22, gender: 'Male', subject01: subjects[1].name, subject02: subjects[3].name, subject03: subjects[4].name },
  { id: 7, name: 'Jose Luis Mora', career: careers[2], age: 19, gender: 'Male', subject01: subjects[5].name, subject02: subjects[1].name, subject03: subjects[8].name },
  { id: 8, name: 'Raul Solis', career: careers[0], age: 28, gender: 'Male', subject01: subjects[9].name, subject02: subjects[8].name, subject03: subjects[7].name },
  { id: 9, name: 'Paula Rodriguez', career: careers[1], age: 20, gender: 'Female', subject01: subjects[0].name, subject02: subjects[2].name, subject03: subjects[4].name },
  { id: 10, name: 'Karla Jimenez', career: careers[0], age: 21, gender: 'Female', subject01: subjects[6].name, subject02: subjects[9].name, subject03: subjects[1].name }
];

module.exports = students;
