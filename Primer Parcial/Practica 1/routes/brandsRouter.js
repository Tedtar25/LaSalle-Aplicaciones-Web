const express = require('express');
const faker = require('faker');

const brandRouter = express.Router();

// Array de amrcas falsas
const generateMockBrands = (size = 25) => {
  const brands = [];
  for (let i = 0; i < size; i++) {
    brands.push({
      id: i + 1,
      brandName: faker.company.companyName(),
      description: faker.company.catchPhrase(),
      active: faker.datatype.boolean(),
    });
  }
  return brands;
};

const mockBrands = generateMockBrands();

// GET para las marcas
brandRouter.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size ? parseInt(size, 10) : 25;
  const brands = generateMockBrands(limit);
  res.status(200).json(brands);
});

// Ruta para  una marca por su id
brandRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const brand = mockBrands.find(brand => brand.id === parseInt(id, 10));

  if (brand) {
    res.status(200).json(brand);
  } else {
    res.status(404).send('Marca no encontrada');
  }
});

brandRouter.get('/filter', (req, res) => {
  res.send('Yo soy una ruta para filtrado de marcas');
});

module.exports = brandRouter;
