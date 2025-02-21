const express = require('express');
const UserServices = require("../services/usersServices");

const router = express.Router();
const userService = new UserServices();

// Ruta para obtener todos los usuarios
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                   username:
 *                     type: string
 *                     description: Nombre de usuario
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error); // Pasa el error al middleware errorHandler
  }
});

// Ruta para obtener un usuario por ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error); // Pasa el error al middleware errorHandler
  }
});

// Ruta para crear un nuevo usuario
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const newUser = await userService.create({ name, username, password });
    res.status(201).json({
      message: 'User Added',
      data: newUser,
    });
  } catch (error) {
    next(error); // Pasa el error al middleware errorHandler
  }
});

// Ruta para actualizar un usuario
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza un usuario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, password } = req.body;
    const updatedUser = await userService.update(id, { name, username, password });

    if (updatedUser) {
      res.status(200).json({
        message: 'User Updated',
        data: updatedUser,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error); // Pasa el error al middleware errorHandler
  }
});

// Ruta para eliminar un usuario
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.delete(id);

    if (deletedUser) {
      res.status(200).json({
        message: 'User Deleted',
        data: deletedUser,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error); // Pasa el error al middleware errorHandler
  }
});

module.exports = router;
