const express = require('express');
const ProductService = require('../services/productsService');

const router = express.Router();
const service = new ProductService();

// Ruta para obtener todos los productos
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene una lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                   categoryId:
 *                     type: integer
 *                     description: ID de la categoría del producto
 *                   brandId:
 *                     type: integer
 *                     description: ID de la marca del producto
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await service.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener un producto por ID
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: No se encontró el producto
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'No Product Found' });
    }
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener productos por categoría
/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Obtiene productos por ID de categoría
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Productos encontrados en la categoría
 */
router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const products = await service.getByCategory(categoryId);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener productos por marca
/**
 * @swagger
 * /products/brand/{brandId}:
 *   get:
 *     summary: Obtiene productos por ID de marca
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Productos encontrados de la marca
 */
router.get('/brand/:brandId', async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const products = await service.getByBrand(brandId);
    res.json(products);
  } catch (error) {
    next(error);
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
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'New Product Added',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar un producto
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualiza un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
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
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: No se encontró el producto
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await service.update(id, body);

    if (updatedProduct) {
      res.status(200).json({
        message: 'Product Updated',
        data: updatedProduct,
      });
    } else {
      res.status(404).json({ message: 'No Product Found' });
    }
  } catch (error) {
    next(error);
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
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: No se encontró el producto
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.delete(id);

    if (deletedProduct) {
      res.status(200).json({
        message: 'Product Deleted',
        data: deletedProduct,
      });
    } else {
      res.status(404).json({ message: 'No Product Was Found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
