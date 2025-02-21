const express = require('express');
const router = express.Router();
const departments = require('../data/department');
const managers = require('../data/supervisor');
const areas = require('../data/area');
const employees = require('../data/employees');

router.get('/', (req, res) => {
  res.status(200).json(departments);
});

router.post('/', (req, res) => {
  try {
    const { name, manager, area } = req.body;

    if (!name || !manager || !area) {
      return res.status(400).json({ error: 'Es necesario ingresar todos los datos del departamento.' });
    }

    if (!managers.find(m => m.name === manager)) {
      return res.status(404).json({ error: 'El supervisor no existe, por favor registralo primero.' });
    }

    if (!areas.find(a => a.name === area)) {
      return res.status(404).json({ error: 'El area no existe, por favor registrala primero.' });
    }

    const existingDepartment = departments.find(d => d.name === name);
    if (existingDepartment) {
      return res.status(418).json({ error: 'El departamento ya existe' });
    }

    const newDepartment = {
      departmentNumber: departments.length + 1,
      name: name,
      manager: manager,
      area: area
    };

    departments.push(newDepartment);

    res.status(201).json({
      message: 'Nuevo departamento creado.',
      department: newDepartment
    });
  } catch (error) {
    res.status(400).json({ error: 'Hubo un error al intentar agregar un nuevo departamento.' });
  }
});

router.patch('/search/:id', (req, res) => {
  try {
    const { id } = req.params;
    const departmentNumber = Number(id); 
    const { name, manager, area } = req.body; 

    const department = departments.find(dep => dep.departmentNumber === departmentNumber);
    if (!department) {
      return res.status(404).json({ message: 'Departamento no encontrado.' });
    }

    if (name !== undefined) department.name = name;
    if (manager !== undefined) department.manager = manager;
    if (area !== undefined) department.area = area;

    res.status(200).json({ message: 'Departamento actualizado correctamente.', department });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar actualizar los datos del departamento.' });
  }
});

router.get('/search/:id', (req, res) => {
  const { id } = req.params;
  const department = departments.find(dep => dep.departmentNumber === Number(id));

  if (department) {
    res.status(200).json(department);
  } else {
    res.status(404).json({ message: 'Departamento no encontrado' });
  }
});

router.delete('/search/:id', (req, res) => {
  const { id } = req.params;
  const departmentNumber = Number(id);

  const department = departments.find(dep => dep.departmentNumber === departmentNumber);
  if (!department) {
      return res.status(404).json({ error: "Departamento no encontrado" });
  }

  const departmentName = department.name;

  const empleadosAsociados = employees.filter(empleado =>
      empleado.department1 === departmentName ||
      empleado.department2 === departmentName ||
      empleado.department3 === departmentName
  );

  if (empleadosAsociados.length > 0) {
      return res.status(400).json({
          error: "No se puede eliminar el departamento porque tiene empleados asignados"
      });
  }
  
  const index = departments.findIndex(dept => dept.departmentNumber === departmentNumber);
  departments.splice(index, 1);

  res.status(200).json({ message: `Departamento eliminado correctamente`, data: department });
});

module.exports = router;


/*

418 I'm a teapot
The server refuses the attempt to brew coffee with a teapot.

*/