const express = require('express');
const routerApi = require('./routes/routes');
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.listen(port, () => {
    console.log("Server is running on: ", port);
});

