const express = require('express');
const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');

// Importar los middlewares
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const logErrors = require('./middlewares/logErrors');
const errorHandler = require('./middlewares/errorHandlers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware de logging
app.use(loggingMiddleware);

routerApi(app);
setupSwagger(app);

// Middlewares de error
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Servidor ejecutándose en el puerto:', port);
});
