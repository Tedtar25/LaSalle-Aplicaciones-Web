const express = require('express');
const routerApi = require('./routes/rutas');

const app=express();
const port=process.env.PORT || 3000;

app.listen(port, () =>{
  console.log('Ahoy marino, bienvenido al puerto: '+port);
});

routerApi(app);
