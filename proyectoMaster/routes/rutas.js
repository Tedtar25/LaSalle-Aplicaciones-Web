const productsRouter=require('./productRouter');
const moviesRouter=require('./moviesRouter');
const express = require('express');

function routerApi(app){
  const router=express.Router();
  app.use('/products', productsRouter);
  app.use('/movies', moviesRouter);
  app.use('/api/v1',router); //RUTA MAESTRA
};

module.exports=routerApi;
