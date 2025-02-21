const userRouter = require('./usersRouter'); // Router para manejar usuarios.
const categoriesRouter = require('./categoriesRouter'); // Router para manejar categorías.
const brandsRouter = require('./brandsRouter'); // Router para manejar marcas.
const productRouter = require('./productsRouter'); // Router para manejar productos.

function routerApi(app) {
  // Definimos las rutas para los diferentes recursos.
  app.use('/api/v3/users', userRouter); // Ruta base para manejar peticiones de usuarios.
  app.use('/api/v3/categories', categoriesRouter); // Ruta base para manejar peticiones de categorías.
  app.use('/api/v3/brands', brandsRouter); // Ruta baes para manejar peticiones de marcas.
  app.use('/api/v3/products', productRouter); // Ruta base para manejar peticiones de productos.
}

module.exports = routerApi;
