// Importamos Express, un framework para crear y gestionar rutas en el servidor.
const express = require('express');

// Creamos una instancia del router de Express,
// esto nos permitirá definir rutas específicas para este módulo.
const router = express.Router();

// ARRAY DE DATOS: Definimos un array "users".
let users = [
  { id: 1, name: 'Micky Huidobro', username: 'micky1985', password: 'guitarra' },
  { id: 2, name: 'Paco Ayala', username: 'paco_rock', password: 'bajo' },
  { id: 3, name: 'Randy Ebright', username: 'randy_molotov', password: 'batería' },
  { id: 4, name: 'Tito Fuentes', username: 'tito_fuentes', password: 'voz' },
  { id: 5, name: 'Cesar Carrillo', username: 'cesar_carrillo', password: '123' },
];

// Ruta GET para obtener todos los usuarios.
router.get('/', (req, res) => {
  res.json(users);
});

// Ruta GET por ID para obtener un usuario especifico.
router.get('/:id', (req, res) => {
  const { id } = req.params; // Extraemos el id.
  const user = users.find((m) => m.id == id); // Busca al usuario correspondiente.

  // Si no encontramos ningún usuario con ese id, respondemos con un status code 404.
  if (!user) return res.status(404).json({ message: 'No User Found' });

  return res.json(user);
});

// Ruta POST para agregar un nuevo usuario.
router.post('/', (req, res) => {
  const { name, username, password } = req.body; // Extraemos los datos del cuerpo de la solicitud.
  const maxId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;

  // Creamos un nuevo objeto de usuario con los datos proporcionados.
  const newUser = {
    id: maxId + 1,
    name, // Nombre del nuevo usuario.
    username, // Nombre de usuario.
    password, // Contraseña del nuevo usuario.
  };

  // Agregamos el nuevo usuario al array "users".
  users.push(newUser);

  // Respondemos con un status code y el nuevo usuario agregado.
  res.status(201).json({
    message: 'User Added',
    data: newUser,
  });
});

// Ruta PATCH para actualizar parcialmente un usuario existente por su "id".
router.patch('/:id', (req, res) => {
  const { id } = req.params; // Extraemos el id.
  const { name, username, password } = req.body; //Campos a actualizar del cuerpo de la solicitud.
  const user = users.find((m) => m.id == id); // Usuario que cioncide con el id dado.

  // Si el usuario no existe, respondemos con un status code 404.
  if (!user) return res.status(404).json({ message: 'No User Found' });

  // Actualizamos los campos del usuario si fueron proporcionados.
  if (name) user.name = name;
  if (username) user.username = username;
  if (password) user.password = password;

  // Respondemos con un status code y los datos del usuario actualizado.
  return res.status(200).json({
    message: 'User Updated',
    data: user,
  });
});

// Ruta DELETE para eliminar un usuario existente por su "id".
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((m) => m.id == id);

  // Si no encontramos ningún usuario con ese id, respondemos con un status code 404.
  if (userIndex === -1) {
    return res.status(404).json({ message: 'No User Found' });
  }

  // Eliminamos el usuario del array usando el índice encontrado.
  const deletedUser = users.splice(userIndex, 1);

  // Respondemos con un status code y los datos del usuario eliminado.
  return res.status(200).json({
    message: 'User Deleted',
    data: deletedUser, // Datos del usuario eliminado.
  });
});

// Exportamos el router para ser utilizado en otros módulos.
module.exports = router;
