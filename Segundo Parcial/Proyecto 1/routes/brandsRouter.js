// Importamos Express, framework que usaremos para
// crear y gestionar rutas en nuestro servidor.
const express = require('express');

// Creamos una instancia del router de Express,
// esta permite definir rutas específicas para este módulo.
const router = express.Router();

// ARRAY DE DATOS: Aquí definimos un array llamado "brands"
// que contiene objetos de forma estática.
// Cada objeto representa una marca con diferentes atributos.
let brands = [
  {
    id: 1,
    brandName: 'Szechuan Sauce',
    description: "Famosa salsa de McDonald's",
    active: 'yes',
  },
  {
    id: 2,
    brandName: 'Blips and Chitz',
    description: 'Sala de juegos interdimensional',
    active: 'yes',
  },
  {
    id: 3,
    brandName: 'Mr. Meeseeks Box',
    description: 'Crea un Meeseeks para ayudarte',
    active: 'yes',
  },
  {
    id: 4,
    brandName: 'Pickle Rick Snacks',
    description: 'Snacks inspirados en Pickle Rick',
    active: 'yes',
  },
  {
    id: 5,
    brandName: 'Wubba Lubba Dub Dub!',
    description: 'Famosa frase de Rick',
    active: 'yes',
  },
];

// Ruta GET para conseguir a todas las marcas.
router.get('/', (req, res) => {
  res.json(brands); // Enviamos la lista de marcas
});

// Ruta GET para conseguir una marca por su "id".
// El id se pasa como parámetro en la URL.
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Buscamos la marca cuyo id coincida con el que nos prooprcionen.
  const brand = brands.find((m) => m.id == id);

  // Si no encontramos ninguna marca con ese id, respondemos con un status code 404.
  if (!brand) return res.status(404).json({ message: 'No Brand Found' });

  // Si la marca existe, devolvemos la marca como respuesta en formato JSON.
  return res.json(brand);
});

// Ruta POST para agregar una nueva marca.
// Los datos de la nueva marca se envían en el cuerpo de la solicitud (req.body).
router.post('/', (req, res) => {
  const { brandName, description, active } = req.body;

  // Calculamos el id más alto existente en el array "brands" y sumamos 1 para la nueva marca.
  const maxId =
    brands.length > 0 ? Math.max(...brands.map((brand) => brand.id)) : 0;

  // Creamos un nuevo objeto de marca con los datos proporcionados.
  const newBrand = {
    id: maxId + 1,
    brandName,
    description,
    active,
  };

  // Agregamos la nueva marca al array "brands".
  brands.push(newBrand);

  // Respondemos con un status code y la nueva marca agregada.
  res.status(201).json({
    message: 'New Brand Added',
    data: newBrand, // Mostramos los datos de la nueva marca.
  });
});

// Ruta PATCH: Esta ruta permite actualizar parcialmente una marca existente por su "id".
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { brandName, description, active } = req.body;

  // Buscamos la marca que coincida con el id proporcionado.
  const brand = brands.find((m) => m.id == id);

  // Si la marca no existe, respondemos con un status code 404.
  if (!brand) return res.status(404).json({ message: 'No Brand Found' });

  // Si se proporcionó un nuevo brandName, actualizamos el nombre de la marca.
  if (brandName) brand.brandName = brandName;

  // Si se proporcionó una nueva descripcion, la actualizamos.
  if (description) brand.description = description;

  // Si se proporcionó un nuevo estado active, lo actualizamos.
  if (active) brand.active = active;

  // Respondemos con un status code y la marca actualizada.
  res.status(200).json({
    message: 'The Brand Has Been Updated',
    data: brand,
  });
});

/*
router.patch('/activation/:id', (req, res) => {
  const { id } = req.params;
  const active = req.body;
  const brand = brands.find((m) => m.id == id);

  if (!brand) return res.status(404).json({ message: 'No Brand Found' });

  if (active) brand.active = active;

  res.status(200).json({
    message: 'The Brand Has Been Updated',
    data: brand,
  });
});
*/

// Ruta DELETE: Esta ruta permite eliminar una marca existente por su "id".
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Buscamos el índice de la marca que coincida con el id proporcionado.
  const brandIndex = brands.findIndex((m) => m.id == id);

  // Si no encontramos ninguna marca con ese id, respondemos con un status code 404.
  if (brandIndex === -1) {
    return res.status(404).json({ message: 'No Brand Found' });
  }

  // Eliminamos la marca del array usando el índice encontrado.
  const deletedBrand = brands.splice(brandIndex, 1);

  // Respondemos con un status code y los datos de la marca eliminada.
  res.status(200).json({
    message: 'The Brand Has Been Deleted',
    data: deletedBrand,
  });
});

// Exportamos el router para ser utilizado en el archivo routes.js.
module.exports = router;
