const express = require('express');
const faker = require('faker');
//
const { mockAula } = require('./aulaRouter'); //importa mockAula de aulaRouter
const { mockProfesor } = require('./profesoresRouter'); // importa mockProfesor de profesorRouter
//
const subjectRouter = express.Router();

const mockSubjects = [];
const mockSubjectsSize = 10;
for (let i = 0; i < mockSubjectsSize; i++) {
  mockSubjects.push({
    idSubject: i + 1,
    subjectName: faker.random.arrayElement(['Inglés', 'Español', 'Matemáticas', 'Historia', 'Geografía']),
    subjectProfessor: faker.random.arrayElement(mockProfesor).name,
    subjectClassroom: faker.random.arrayElement(mockAula).classNumber
  });
}

subjectRouter.get('/', (req, res) => {
  res.status(200).json(mockSubjects);
});

module.exports = { subjectRouter, mockSubjects };
