// Importamos Express, framework que usaremos para
// crear y gestionar rutas en nuestro servidor.
const express = require('express');

// Creamos una instancia del router de Express,
// esta permite definir rutas específicas para este módulo.
const router = express.Router();

// ARRAY DE PRODUCTOS: Aquí definimos un array llamado "products"
// que contiene objetos de forma estática.
let products = [
  {
    id: 1,
    image: 'szechuan_sauce.jpg',
    productName: 'Szechuan Sauce',
    description: "La famosa salsa de McDonald's, ideal para tus comidas.",
    price: 5.99,
    stock: 100,
    category_id: 1,
    brand_id: 1,
  },
  {
    id: 2,
    image: 'blips_and_chitz.jpg',
    productName: 'Blips and Chitz Token',
    description: 'Tokens para jugar en la sala de juegos interdimensional.',
    price: 1.5,
    stock: 200,
    category_id: 3,
    brand_id: 2,
  },
  {
    id: 3,
    image: 'pickle_rick_snacks.jpg',
    productName: 'Pickle Rick Snacks',
    description: 'Snacks inspirados en Pickle Rick, perfectos para compartir.',
    price: 3.99,
    stock: 150,
    category_id: 4,
    brand_id: 4,
  },
  {
    id: 4,
    image: 'mr_meeseeks_box.jpg',
    productName: 'Mr. Meeseeks Box',
    description: 'Crea tu propio Meeseeks para ayudarte en tareas.',
    price: 19.99,
    stock: 50,
    category_id: 2,
    brand_id: 3,
  },
  {
    id: 5,
    image: 'wubba_lubba_dub_dub.jpg',
    productName: 'Wubba Lubba Dub Dub Merchandise',
    description: 'Mercancía oficial inspirada en la famosa frase de Rick.',
    price: 15.0,
    stock: 75,
    category_id: 1,
    brand_id: 5,
  },
];

// Ruta GET para obtener todos los productos del array.
router.get('/', (req, res) => {
  res.json(products);
});

// Ruta GET para obtener el producto en base a un id.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((m) => m.id == id);

  // Si no encontramos ningún producto con ese id, respondemos con un status code 404.
  if (!product) return res.status(404).json({ message: 'No Product Found' });

  return res.json(product);
});

// Ruta GET por categoría: Filtra los productos por category_id
router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const filteredProducts = products.filter((p) => p.category_id == categoryId);
  res.json(filteredProducts);
});

// Ruta GET por marca: Filtra los productos por brand_id
router.get('/brand/:brandId', (req, res) => {
  const { brandId } = req.params;
  const filteredProducts = products.filter((p) => p.brand_id == brandId);
  res.json(filteredProducts);
});

// Ruta POST para agregar un nuevo producto al array.
router.post('/', (req, res) => {
  const {
    image,
    productName,
    description,
    price,
    stock,
    category_id,
    brand_id,
  } = req.body;
  const maxId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id))
      : 0;

  // Creamos un nuevo objeto de producto con los datos proporcionados.
  const newProduct = {
    id: maxId + 1,
    image,
    productName,
    description,
    price,
    stock,
    category_id,
    brand_id,
  };

  // Agregamos el nuevo producto al array "products".
  products.push(newProduct);

  // Respondemos con un status code y el nuevo producto agregado.
  res.status(201).json({
    message: 'New Product Added',
    data: newProduct,
  });
});

// Ruta PATCH nos permite actualizar un producto existente por su "id".
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const {
    image,
    productName,
    description,
    price,
    stock,
    category_id,
    brand_id,
  } = req.body;
  const product = products.find((m) => m.id == id);

  // Si el producto no existe, respondemos con un status code 404.
  if (!product) return res.status(404).json({ message: 'No Product Found' });

  // Actualizamos los campos del producto si fueron proporcionados.
  if (image) product.image = image;
  if (productName) product.productName = productName;
  if (description) product.description = description;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category_id) product.category_id = category_id;
  if (brand_id) product.brand_id = brand_id;

  // Respondemos con un status code y los datos del producto actualizado.
  res.status(200).json({
    message: 'Product Updated',
    data: product,
  });
});

// Ruta DELETE nos permite eliminar un producto existente por su "id".
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((m) => m.id == id);

  // Si no encontramos ningún producto con ese id, respondemos con un status code 404.
  if (productIndex === -1) {
    return res.status(404).json({ message: 'No Product Was Found' });
  }

  // Eliminamos el producto del array usando el índice encontrado.
  const deletedProduct = products.splice(productIndex, 1);

  // Respondemos con un status code y los datos del producto eliminado.
  res.status(200).json({
    message: 'Product Deleted',
    data: deletedProduct,
  });
});

// Exportamos el router para ser utilizado en otros módulos.
module.exports = router;
