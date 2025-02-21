const teachers = require('./teachers');
const classrooms = require('./classrooms');

const subjects = [
  { id: 1, name: 'Matematicas', teacher: teachers[0].name, classroom: classrooms[0].building },
  { id: 2, name: 'Ingles', teacher: teachers[2].name, classroom: classrooms[1].building },
  { id: 3, name: 'Ciencias Sociales', teacher: teachers[3].name, classroom: classrooms[2].building },
  { id: 4, name: 'Humanismo', teacher: teachers[6].name, classroom: classrooms[3].building },
  { id: 5, name: 'Aplicaciones Web', teacher: teachers[1].name, classroom: classrooms[2].building },
  { id: 6, name: 'Estadistica', teacher: teachers[8].name, classroom: classrooms[5].building },
  { id: 7, name: 'Historia', teacher: teachers[9].name, classroom: classrooms[6].building },
  { id: 8, name: 'Geografia', teacher: teachers[7].name, classroom: classrooms[8].building },
  { id: 9, name: 'Filosofia', teacher: teachers[6].name, classroom: classrooms[9].building },
  { id: 10, name: 'POA', teacher: teachers[4].name, classroom: classrooms[2].building },
];

module.exports = subjects;

