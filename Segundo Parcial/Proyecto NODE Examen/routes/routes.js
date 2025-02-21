const employeesRouter = require('./employeesRouter');
const supervisorRouter = require('./supervisorRouter');
const departmentRouter = require('./departmentRouter');
const areaRouter = require('./areaRouter');

function routerApi(app){
  app.use('/api/v2/employees', employeesRouter);
  app.use('/api/v2/supervisor', supervisorRouter);
  app.use('/api/v2/departments', departmentRouter);
  app.use('/api/v2/areas', areaRouter);
}

module.exports = routerApi;
