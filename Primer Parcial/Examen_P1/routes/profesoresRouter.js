const express = require('express');
const faker = require('faker');

const profesorRouter = express.Router();

const mockProfesor = [];
const mockProfesorSize = 25;
for (let i = 0; i < mockProfesorSize; i++) {
  mockProfesor.push({
    idProfesor: i + 1,
    name: faker.name.findName(),
    carrer: faker.random.arrayElement(['ISSC', 'QFB', 'IBQ', 'IGE']),
    turn: faker.random.arrayElement(['Matutino', 'Bespertino']),
  });
};

profesorRouter.get('/', (req, res) =>{
  res.status(200).json(mockProfesor);
});

module.exports = {profesorRouter, mockProfesor};
