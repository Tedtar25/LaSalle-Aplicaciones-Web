const express = require('express');
const brandsService = require('../services/brandsService');

const router = express.Router();
const service = new brandsService();

// Obtener todas las marcas
/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtiene una lista de marcas
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la marca
 *                   name:
 *                     type: string
 *                     description: Nombre de la marca
 */
router.get('/', async (req, res, next) => {
  try {
    const brands = await service.getAll();
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

// Obtener una marca por ID
/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtiene una marca por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       404:
 *         description: Marca no encontrada
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await service.getById(Number(id));
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Crear una nueva marca
/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crea una nueva marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *       404:
 *         description: Error al crear una marca
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newBrand = await service.create(body);
    res.status(201).json(newBrand);
  } catch (error) {
    next(error);
  }
});

// Actualizar una marca
/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualiza una marca existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 *       404:
 *         description: Marca no encontrada
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedBrand = await service.update(Number(id), body);
    res.json({
      message: 'Brand updated',
      data: updatedBrand,
    });
  } catch (error) {
    if (error.message === 'Brand Not Found') {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
});

// Eliminar una marca
/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Elimina una marca por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
 *       404:
 *         description: Marca no encontrada
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBrand = await service.delete(Number(id));
    res.json({
      message: 'Brand deleted',
      data: deletedBrand,
    });
  } catch (error) {
    if (error.message === 'Brand Not Found') {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
});

module.exports = router;
