// Importar el módulo de Express
const express = require('express');

// Importar las rutas que hemos creado
const routerApi = require('./routes/rutas');

// Crear una nueva aplicación de Express
const app = express();
// Definir el puerto donde escuchará la aplicación
const port = process.env.PORT || 3000;

// Middleware para hacer que la aplicación maneje datos en formato JSON
app.use(express.json());

// Iniciar el servidor y mostrar un mensaje en la consola para saber que funciona
app.listen(port, () => {
  console.log('Ahoy marino, bienvenido al puerto: ' + port);
});

// Configurar las rutas de la aplicación
routerApi(app);
