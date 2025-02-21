const express = require('express');
const routerApi = require('./routes/centralRoutes');

const app = express();
const port = process.env.PORT||3003;

app.listen(port, () =>{
  console.log('Servidor de puerto: '+port);
});

routerApi(app);
