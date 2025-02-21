// Importamos Express, framework que usaremos para
// crear y gestionar rutas en nuestro servidor.
const express = require('express');

// Creamos una instancia del router de Express,
// esta permite definir rutas específicas para este módulo.
const router = express.Router();

// ARRAY DE DATOS: Aquí definimos un array llamado "categories"
// que contiene objetos de forma estática.
let categories = [
  {
    id: 1,
    categoryName: 'Sauces',
    description: 'Salsas para acompañar',
    active: 'yes',
  },
  {
    id: 2,
    categoryName: 'Cereales Interdimensionales',
    description: 'Cereales de diferentes dimensiones',
    active: 'yes',
  },
  {
    id: 3,
    categoryName: 'Juegos y Entretenimiento',
    description: 'Juegos de sala y diversiones',
    active: 'yes',
  },
  {
    id: 4,
    categoryName: 'Snacks Locos',
    description: 'Snacks divertidos y locos',
    active: 'yes',
  },
  {
    id: 5,
    categoryName: 'Cereales Ninios',
    description: 'Variedades de cereales para niños',
    active: 'no',
  }
];

// Ruta GET para conseguir a todas las categorias.
router.get('/', (req, res) => {
  res.json(categories);
});

// Ruta GET para conseguir una categoria por su "id".
// El id se pasa como parámetro en la URL.
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.find((m) => m.id == id);

  // Si no encontramos ninguna categoría con ese id, respondemos con un status code 404.
  if (!category) return res.status(404).json({ message: 'No Category Found' });

  return res.json(category); // Devolvemos la categoría como respuesta en formato JSON.
});

// Ruta POST para agregar una nueva categoria.
// Los datos de la nueva marca se envían en el cuerpo de la solicitud (req.body).
router.post('/', (req, res) => {
  const { categoryName, description, active } = req.body;
  const maxId = categories.length > 0 ? Math.max(...categories.map((category) => category.id)) : 0;

  // Creamos un nuevo objeto de categoría con los datos proporcionados.
  const newCategory = {
    id: maxId + 1,
    categoryName,
    description,
    active,
  };

  // Agregamos la nueva categoría al array "categories".
  categories.push(newCategory);

  // Respondemos con un status code y la nueva categoría agregada.
  res.status(201).json({
    message: 'Category Added',
    data: newCategory,
  });
});

// Ruta PATCH: Esta ruta permite actualizar parcialmente una categoría existente por su "id".
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { categoryName, description, active } = req.body;
  const category = categories.find((m) => m.id == id);

  // Si la categoría no existe, respondemos con un status code 404.
  if (!category) return res.status(404).json({ message: 'No Category Found' });

  // Si se proporcionó un nuevo categoryName, actualizamos el nombre de la categoría.
  if (categoryName) category.categoryName = categoryName;

  // Si se proporcionó una nueva description, la actualizamos.
  if (description) category.description = description;

  // Si se proporcionó un nuevo estado active, lo actualizamos.
  if (active) category.active = active;

  // Respondemos con un status code y la categoría actualizada.
  res.status(200).json({
    message: 'Category Updated',
    data: category,
  });
});

/*
// Ruta PATCH para activar/desactivar una categoría por su ID.
router.patch('/activation/:id', (req, res) => {
  const { id } = req.params; // Extraemos el id de los parámetros de la URL.
  const active = req.body; // Extraemos el estado de activación del cuerpo de la solicitud.
  const category = categories.find((m) => m.id == id); // Buscamos la categoría correspondiente.

  // Si no encontramos ninguna categoría con ese id, respondemos con un status code 404.
  if (!category) return res.status(404).json({ message: 'No category Found' });

  // Si se proporcionó un nuevo estado active, lo actualizamos.
  if (active) category.active = active;

  // Respondemos con un status code y los datos de la categoría actualizada.
  res.status(200).json({
    message: 'The Category Has Been Updated', // Respondemos con un status code.
    data: category, // Enviamos los datos de la categoría actualizada.
  });
});
*/

// Ruta DELETE: Podemos eliminar una categoría existente por su "id".
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const categoryIndex = categories.findIndex((m) => m.id == id);

  // Si no encontramos ninguna categoría con ese id, respondemos con un status code 404.
  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'No Category Found' });
  }

  // Eliminamos la categoría del array usando el índice encontrado.
  const deletedCategory = categories.splice(categoryIndex, 1);

  // Respondemos con un status code y los datos de la categoría eliminada.
  res.status(200).json({
    message: 'Category Deleted',
    data: deletedCategory,
  });
});

// Exportamos el router para ser utilizado en otros módulos.
module.exports = router;
