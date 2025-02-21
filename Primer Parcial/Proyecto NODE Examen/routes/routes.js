const studentsRouter = require('./studentRouter');
const teachersRouter = require('./teacherRouter');
const subjectsRouter = require('./subjectRouter');
const classroomsRouter = require('./classroomRouter');

function routerApi(app){
  app.use('/students', studentsRouter);
  app.use('/teachers', teachersRouter);
  app.use('/subjects', subjectsRouter);
  app.use('/classrooms', classroomsRouter);
}

module.exports = routerApi;
