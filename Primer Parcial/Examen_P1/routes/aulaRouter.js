const express = require('express');
const faker = require('faker');

const aulasRouter = express.Router();

const mockAula = [];
const mockAulaSize = 25;
for (let i = 0; i < mockAulaSize; i++) {
  mockAula.push({
    classNumber: faker.random.arrayElement(['101','102','103','104']),
    turn: faker.random.arrayElement(['Matutino','Vespertino'])
  });
};

aulasRouter.get('/', (req, res) => {
  res.status(200).json(mockAula);
});

module.exports = { aulasRouter, mockAula }; //Se van a enviar ambos datos, en la ruta central tengo que especificar cual quiero.
