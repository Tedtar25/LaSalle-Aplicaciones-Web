const express = require('express');
const faker = require('faker');

const categoryRouter = express.Router();

// Generar una lista de categorías falsas
const generateMockCategories = (size = 25) => {
  const categories = [];
  for (let i = 0; i < size; i++) {
    categories.push({
      id: i + 1,
      categoryName: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean(),
    });
  }
  return categories;
};

const mockCategories = generateMockCategories();

// GET para todos
categoryRouter.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size ? parseInt(size, 10) : 25;
  const categories = generateMockCategories(limit);
  res.status(200).json(categories);
});

// Buscar por su Id
categoryRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = mockCategories.find(cat => cat.id === parseInt(id, 10));

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).send('Categoría no encontrada');
  }
});


categoryRouter.get('/filter', (req, res) => {
  res.send('Yo soy una ruta para filtrado de categorías');
});

module.exports = categoryRouter;

