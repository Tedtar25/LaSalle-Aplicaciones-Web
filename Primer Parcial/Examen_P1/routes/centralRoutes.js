const alumnosRouter = require('./alumnosRouter');
const {subjectRouter} = require('./materiasRouter');
const {profesorRouter} = require('./profesoresRouter');
const {aulasRouter} = require('./aulaRouter'); // Importa solo aulasRouter desde aulaRouter.js y no la constante de mockAula a la vez.

function routerApi(app){
  app.use('/api/students', alumnosRouter);
  app.use('/api/subjects', subjectRouter);
  app.use('/api/teachers', profesorRouter);
  app.use('/api/classrooms', aulasRouter);
};

module.exports = routerApi;
