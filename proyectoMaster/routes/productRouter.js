const express = require('express');
const productService = require('../services/productService');

const router = express.Router();
const services = new productService();

// Ruta para obtener todos los productos
/**
 *  @swagger
 * /products:
 *   get:
 *     summary: Obtiene una lista de productos
 *     responses:
 *       200:
 *         description: La lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const products = await services.getAll();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy una ruta para filtrado');
});

// Ruta para obtener producto por ID
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image:
 *                   type: string
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await services.getById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); //Si ocurre un error, pasa el error al middleware errorHandler
  }
});

// Ruta para crear un nuevo producto
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await services.create(body);
  res.status(201).json(newProduct);
});

// Ruta para actualizar un producto
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualiza un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedProduct = await services.update(id, body);
  if (updatedProduct instanceof Error) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json({
      message: 'Product updated',
      data: updatedProduct,
    });
  }
});

// Ruta para eliminar un producto
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hasta la vista BABY!
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await services.delete(id);
  if (deletedProduct instanceof Error) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json({
      message: 'Product deleted',
      data: deletedProduct,
    });
  }
});

module.exports = router;

/* CREANDO MIDDLEWARES */
/*

  fucntion(req, res, next){
   if(algo){
      res.send('end');
    }else{
      next();
    }
  }

*/
