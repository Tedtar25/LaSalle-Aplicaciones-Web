const express = require('express');
const router = express.Router();
const employees = require('../data/employees'); 
const departments = require('../data/department');

router.get('/', (req, res) => {
  res.status(200).json(employees);
});

router.get('/search/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.employeeNumber === Number(id));

  if (!employee) {
    return res.status(404).json({ message: 'No se encontro un empleado con ese ID.' });
  }

  res.status(200).json(employee);
});

router.post('/', (req, res) => {
  try {
    const { firstName, lastName, age, gender, department1, department2, department3 } = req.body;

    if (!firstName || !lastName || !age || !gender || !department1 || !department2 || !department3) {
      return res.status(400).json({ error: 'Es necesario ingresar todos los datos del empleado.' });
    }

    const departmentCheck = [department1, department2, department3];
    for (let i = 0; i < departmentCheck.length; i++) {
      if (!departments.find(d => d.name === departmentCheck[i])) {
        return res.status(400).json({ error: `El departamento ${i + 1} no existe o está mal escrito.` });
      }
    }

    const maxEmployeeNumber = employees.length > 0 ? Math.max(...employees.map(emp => emp.employeeNumber)) : 0;

    const newEmployee = {
      employeeNumber: maxEmployeeNumber + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      department1: department1,
      department2: department2,
      department3: department3
    };

    employees.push(newEmployee);

    res.status(201).json({
      message: 'Nuevo empleado creado.',
      Empleado: newEmployee
    });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar agregar un nuevo empleado.' });
  }
});


router.patch('/search/:id', (req, res) => {
  try {
    const { id } = req.params;
    const employee = employees.find(emp => emp.employeeNumber === Number(id));

    if (!employee) {
      return res.status(404).json({ message: 'No existe un empleado con el ID proporcionado.' });
    }

    const { firstName, lastName, age, gender, department1, department2, department3 } = req.body;

    if (firstName !== undefined) employee.firstName = firstName;
    if (lastName !== undefined) employee.lastName = lastName;
    if (age !== undefined) employee.age = age;
    if (gender !== undefined) employee.gender = gender;

    const departmentCheck = [department1, department2, department3];
    for (let i = 0; i < departmentCheck.length; i++) {
      if (departmentCheck[i] && !departments.find(d => d.name === departmentCheck[i])) {
        return res.status(400).json({ error: `El departamento ${i + 1} no existe o esta mal escrito.` });
      }
    }

    if (department1 !== undefined) employee.department1 = department1;
    if (department2 !== undefined) employee.department2 = department2;
    if (department3 !== undefined) employee.department3 = department3;

    res.status(200).json({ message: 'Empleado actualizado parcialmente.', Empleado: employee });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar actualizar los datos del empleado.' });
  }
});

router.delete('/search/:id', (req, res) => {
  const { id } = req.params;
  const employeeIndex = employees.findIndex(emp => emp.employeeNumber === Number(id));

  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'No existe un empleado con el ID proporcionado.' });
  }

  const deletedEmployee = employees.splice(employeeIndex, 1);

  res.status(200).json({
    message: 'Empleado eliminado correctamente.',
    data: deletedEmployee[0]
  });
});


module.exports = router;
