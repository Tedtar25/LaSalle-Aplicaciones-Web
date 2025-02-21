const express = require('express');
const router = express.Router();
const subjects = require('../data/subjects');
const teachers = require('../data/teachers');
const classrooms = require('../data/classrooms');

router.get('/', (req,res) => {
  res.status(200).json(subjects);
});

router.post('/', (req, res) => {
  try {
    const { name, teacher, classroom } = req.body;

    if (!name || !teacher || !classroom) {
      return res.status(500).json({ error: 'Es necesario ingresar todos los datos de la materia.' });
    }

    if ( !teachers.find(t => t.name === teacher) ) {
      return res.status(500).json({ error: 'El profesor no existe, Por favor registralo primero.' });
    }

    if ( !classrooms.find(c => c.building === classroom) ) {
      return res.status(500).json({ error: 'El aula no existe, Por favor registrala primero.' });
    }

    const existingSubject = subjects.find(s => s.name === name);
    if (existingSubject) {
      return res.status(500).json({ error: 'La materia ya existe'});
    }

    const newSubject = {
      id: subjects.length + 1,
      name: name,
      teacher: teacher,
      classroom: classroom
    };

    subjects.push(newSubject);

    res.status(201).json({
      message: 'Nueva materia creada.',
      Materia: newSubject
    });
  } catch (error) {
    res.status(400).json({ error: 'Hubo un error al intentar agregar una nueva Materia.' });
  }
});

router.put('/', (req, res) => {
  try {
    const { id, name, teacher, classroom } = req.body;

    if (!id || !name || !teacher || !classroom) {
      return res.status(500).json({ error: 'Es necesario ingresar todos los datos de la materia para actualizar.' });
    }

    if ( !teachers.find(t => t.name === teacher) ) {
      return res.status(500).json({ error: 'El profesor no existe, Por favor registralo primero.' });
    }

    if ( !classrooms.find(c => c.building === classroom) ) {
      return res.status(500).json({ error: 'El aula no existe, Por favor registrala primero.' });
    }

    const index = subjects.findIndex(sub => sub.id === id);

    if (index === -1) {
      return res.status(400).json({ message: 'No existe una Materia con el ID proporcionado.' });
    }

    subjects[index] = {
      id: id,
      name: name,
      teacher: teacher,
      classroom: classroom
    };

    res.status(200).json({
      message: 'Materia correctamente actualizada.'
    });
  } catch (error) {
    res.status(400).json({ error: 'Hubo un error al intentar actualizar la materia.' });
  }
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const subject = subjects.find(sub => sub.id === id);

  if ( !subject ) {
    return res.status(404).json({ message: 'No se encontró una Materia con ese ID.' });
  }

  res.status(200).json(subject);
});

module.exports = router;
