const express = require('express');
const router = express.Router();
const teachers = require('../data/teachers');

router.use(express.json());

router.get('/', (req, res) => {
  res.status(200).json(teachers);
});

router.post('/', (req, res) => {
  try {
    const { name, career, shift } = req.body;

    if ( !name || !career || !shift) {
      return res.status(400).json({ message: 'Todos los campos son necesarios' });
    }

    const existingTeacher = teachers.find(teacher => teacher.name === name);

    if (existingTeacher) {
      return res.status(400).json({ message: 'El profesor ya existe' });
    }

    const newTeacher = {
      id: teachers.length + 1,
      name: name,
      career: career,
      shift: shift
    }

    teachers.push(newTeacher);

    res.status(201).json({
      message: 'Se dio de alta al profesor',
      data: newTeacher
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});

router.put('/', (req, res) =>{
  try {
    const { id, name, career, shift } = req.body;

    if (!id || !name || !career || !shift) {
      return res.status(400).json({ message: 'Todos los campos son necesarios' });
    }

    const index = teachers.findIndex( teachers => teachers.id === id );

    if ( index === -1 ) {
      return res.status(400).json({ message: 'No existe un profesor con el ID proporcionado.'});
    }

    teachers[index] = {
      id: id,
      name: name,
      career: career,
      shift: shift
    }

    res.status(201).json({message: 'La base del antivirus a sido actualizada!'});
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const teacher = teachers.find((teacher) => teacher.id === parseInt(id));
  if (teacher) {
    res.status(200).json(teacher);
  } else {
    res.status(404).send('Profesor no encontrado');
  }
});

module.exports = router;
