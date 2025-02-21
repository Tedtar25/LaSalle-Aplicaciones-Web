//mongodb+srv://ccp79892:Toro.2800@diablo-cluster.h1ylc.mongodb.net/?retryWrites=true&w=majority&appName=NOMBREdelCLUSTER

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require('cors');
const books = require('./routes/books');
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use('/api/books', books);

mongoose.connect(
    'mongodb+srv://ccp79892:Toro.2800@diablo-cluster.h1ylc.mongodb.net/?retryWrites=true&w=majority&appName=Diablo-Cluster'
).then(() => console.log('Conexion a MongoDB Exitosa'))
    .catch(err => console.log('No se pudo conectar a MongoDB', err))

app.listen(4000);