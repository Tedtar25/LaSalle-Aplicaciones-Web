const express = require('express');
const faker = require('faker');

const userRouter = express.Router();

// Array de usuarios falsos
const generateMockUsers = (size = 25) => {
  const users = [];
  for (let i = 0; i < size; i++) {
    users.push({
      id: i + 1,
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }
  return users;
};

const mockUsers = generateMockUsers();

// Get apar todos
userRouter.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size ? parseInt(size, 10) : 25;
  const users = generateMockUsers(limit);
  res.status(200).json(users);
});

userRouter.get('/filter', (req, res) => {
  res.send('Yo soy una ruta para filtrado de usuarios');
});

// Ruta para obtener un usuario por id
userRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((user) => user.id === parseInt(id, 10));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

module.exports = userRouter;
