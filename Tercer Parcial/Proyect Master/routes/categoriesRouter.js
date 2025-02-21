const express = require('express');
const CategoryServices = require('../services/categoriesService');

const router = express.Router();
const categoryService = new CategoryServices();

// Ruta para obtener todas las categorías
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtiene una lista de categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la categoría
 *                   categoryName:
 *                     type: string
 *                     description: Nombre de la categoría
 *                   description:
 *                     type: string
 *                     description: Descripción de la categoría
 *                   active:
 *                     type: boolean
 *                     description: Estado de la categoría
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener una categoría por ID
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: No se encontró la categoría
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'No Category Found' });
    }
  } catch (error) {
    next(error);
  }
});

// Ruta para crear una nueva categoría
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 */
router.post('/', async (req, res, next) => {
  try {
    const { categoryName, description, active } = req.body;
    const newCategory = await categoryService.create({ categoryName, description, active });
    res.status(201).json({
      message: 'Category Added',
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar una categoría
/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualiza una categoría existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: No se encontró la categoría
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryName, description, active } = req.body;
    const updatedCategory = await categoryService.update(id, { categoryName, description, active });

    if (updatedCategory) {
      res.status(200).json({
        message: 'Category Updated',
        data: updatedCategory,
      });
    } else {
      res.status(404).json({ message: 'No Category Found' });
    }
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar una categoría
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Elimina una categoría por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: No se encontró la categoría
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryService.delete(id);

    if (deletedCategory) {
      res.status(200).json({
        message: 'Category Deleted',
        data: deletedCategory,
      });
    } else {
      res.status(404).json({ message: 'No Category Found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
