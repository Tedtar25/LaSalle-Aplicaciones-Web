const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Config de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion API de proyecto',
    version: '1.0.0',
    description: 'Esta es una API de proyecto con Swagger',
  },
  servers: [
    {
      url:'http://localhost:3000/api/v3',
      description: 'Servidor de desarrollo'
    }
  ]
}


const options = {
  swaggerDefinition,
  apis:['./routes/*.js']
};

const seaggerSpec = swaggerJSDoc(options);

function setupSwagger(app){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(seaggerSpec));
}

module.exports = setupSwagger;
