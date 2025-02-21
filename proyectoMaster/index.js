const express = require('express');
const routerApi=require('./routes/rutas');
const setupSwagger = require('./swagger');

const app = express();

const port = 3002;
app.use(express.json());

app.listen(port, () => {
  console.log('Ahoy marino, bienvenido al puerto ' + port);
});

/* USO DE MIDDLEWARES EN ERRORHANDLER.JS */
const {logErrors, errorHandler} = require('./middlewares/errorHandler');


routerApi(app);
setupSwagger(app);

app.use(logErrors);
app.use(errorHandler);






// PRIMER ENDPOINT
// Define una ruta para el endpoint raíz ('/').
// Cuando un cliente realice una solicitud GET a la raíz del servidor, se enviará una respuesta con el texto "Hola Mundo en Express".
app.get('/', (req, res) => {
  // 'req' es el objeto de solicitud, que contiene información sobre la solicitud HTTP.
  // 'res' es el objeto de respuesta, que se utiliza para enviar una respuesta al cliente.
  res.send('Hola Mundo en Express');
});










/*

// Salida o escucha del servidor
// Inicia el servidor para que escuche en el puerto definido anteriormente.
// Cuando el servidor esté listo y escuchando, se ejecuta la función de callback que imprime un mensaje en la consola indicando que el servidor está en funcionamiento.


//21-08-24
app.get('/nuevaruta', (req, res) => {
  res.send('Hola soy una nueva ruta.');
});

//Este ENDPOINT regresara un .JSON
/*
app.get('/productos', (req, res) => {
  res.json([
    {
      name: 'Coca Cola',
      price: 51,
    },
    {
      name: 'Pepsi',
      price: 45,
    },
    {
      name: 'Doritos',
      price: 60,
    },
  ]);
});
*/


//ENDPOINT basado en POKEAPI
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.get('/users', (req, res) => {
  const { username, lastname, age, address, gender } = req.query;
  if (username && lastname && age && address && gender) {
    res.json({
      username,
      lastname,
      age,
      address,
      gender,
    });
  } else {
    res.send('No hay parametro Query');
  }
  //http://localhost:3002/users?username=cesar&lastname=paez
});



