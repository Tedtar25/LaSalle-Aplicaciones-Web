const express = require('express');
const faker = require('faker');

const { mockSubjects } = require('./materiasRouter'); //importa mockSubjects desde materiasRouter

const studentRouter = express.Router();

const mockStudents = [];
const mockStudentsSize = 25;
for (let i = 0; i < mockStudentsSize; i++) {
  mockStudents.push({
    matricula: i + 1,
    name: faker.name.findName(),
    carrer: faker.random.arrayElement(['ISSC', 'QFB', 'IBQ', 'IGE']),
    age: faker.datatype.number({ min: 18, max: 24 }),
    sex: faker.random.arrayElement(['Male', 'Female']),
    subject01: faker.random.arrayElement(mockSubjects).subjectName,
    subject02: faker.random.arrayElement(mockSubjects).subjectName,
    subject03: faker.random.arrayElement(mockSubjects).subjectName
  });
}

studentRouter.get('/', (req, res) => {
  res.status(200).json(mockStudents);
});

module.exports = studentRouter;
