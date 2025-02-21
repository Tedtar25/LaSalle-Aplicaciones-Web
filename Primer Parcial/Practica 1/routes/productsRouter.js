const express = require('express');
const faker = require('faker');

const productRouter = express.Router();

// Generar una lista de productos falsos
const generateMockProducts = (size = 50) => {
  const products = [];
  for (let i = 0; i < size; i++) {
    products.push({
      id: i + 1,
      image: faker.image.imageUrl(),
      productName: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price()),
      stock: faker.datatype.number({ min: 0, max: 1000 }),
      category_id: faker.datatype.number({ min: 1, max: 10 }),
      brand_id: faker.datatype.number({ min: 1, max: 10 }),
    });
  }
  return products;
};

const mockProducts = generateMockProducts();

// GET para los productos
productRouter.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size ? parseInt(size, 10) : 50;
  const products = generateMockProducts(limit);
  res.status(200).json(products);
});

productRouter.get('/search', (req, res) => {
  const { category_id, brand_id } = req.query;

  const filteredProducts = mockProducts.filter((product) => {
    return(
      (!category_id || product.category_id === parseInt(category_id, 10)) &&
      (!brand_id || product.brand_id === parseInt(brand_id, 10))
    );
  });

  res.status(200).json(filteredProducts);
});


productRouter.get('/filter', (req, res) => {
  res.send('Yo soy una ruta para filtrado de productos');
});

module.exports = productRouter;
