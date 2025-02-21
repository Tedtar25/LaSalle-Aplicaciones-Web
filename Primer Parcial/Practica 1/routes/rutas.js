const userRouter=require('./userRouter');
const categoriesRouter=require('./categoriesRouter');
const brandsRouter=require('./brandsRouter');
const productRouter=require('./productsRouter');

function routerApi(app){
  app.use('/users', userRouter);
  app.use('/category', categoriesRouter);
  app.use('/brand', brandsRouter);
  app.use('/products', productRouter);
}

module.exports=routerApi;
