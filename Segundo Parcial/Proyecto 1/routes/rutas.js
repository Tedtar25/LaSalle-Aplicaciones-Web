// Importamos los routers necesarios para cada entidad de nuestra API.
const userRouter = require('./usersRouter'); // Router para manejar usuarios.
const categoriesRouter = require('./categoriesRouter'); // Router para manejar categorías.
const brandsRouter = require('./brandsRouter'); // Router para manejar marcas.
const productRouter = require('./productsRouter'); // Router para manejar productos.

// Función que configura las rutas de la API.
function routerApi(app) {
  // Definimos las rutas para los diferentes recursos.
  app.use('/v2/users', userRouter); // Ruta base para manejar peticiones de usuarios.
  app.use('/v2/categories', categoriesRouter); // Ruta base para manejar peticiones de categorías.
  app.use('/v2/brands', brandsRouter); // Ruta baes para manejar peticiones de marcas.
  app.use('/v2/products', productRouter); // Ruta base para manejar peticiones de productos.
}

// Exportamos la función para ser utilizada en index.js
module.exports = routerApi;
