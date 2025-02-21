const express = require('express');
const router = express.Router();
const students = require('../data/students');
const subjects = require('../data/subjects');

router.get('/', (req, res) => {
  res.status(200).json(students);
});

router.post('/', (req,res) => {
  try {
    const {name, career, age, gender, subject01, subject02, subject03} = req.body;

    if ( !name || !career || !age || !gender || !subject01 || !subject02 || !subject03 ) {
      return res.status(400).json({ error: 'Es necesario ingresar todos los datos del alumno.'});
    }

    const subjectCheck = [subject01, subject02, subject03];

    for ( let i = 0; i < subjectCheck.length; i ++) {
      if ( !subjects.find(s => s.name === subjectCheck[i])) {
        return res.status(400).json({ error: `La materia 0${i + 1} no existe o esta mal escrita.`});
      }
    }

    const newStudent = {
      id: students.length + 1,
      name: name,
      career: career,
      age: age,
      gender: gender,
      subject01: subject01,
      subject02: subject02,
      subject03: subject03
    }

    students.push(newStudent);

    res.status(201).json({
      message: 'Nuevo estudiante creado.',
      Estudiante: newStudent
    });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar agregar un nuevo Alumno.'});
  }
});

router.put('/', (req, res) => {
  try {
    const { id, name, career, age, gender, subject01, subject02, subject03 } = req.body;

    if ( !id || !name || !career || !age || !gender || !subject01 || !subject02 || !subject03 ) {
      return res.status(500).json({ error: 'Para actualizar los datos de un Alumno, es necesario ingresar todos sus datos.'});
    }

    const subjectCheck = [subject01, subject02, subject03];

    for ( let i = 0; i < subjectCheck.length; i ++) {
      if ( !subjects.find(s => s.name === subjectCheck[i])) {
        return res.status(400).json({ error: `La materia 0${i + 1} no existe o esta mal escrita.`});
      }
    }

    const index = students.findIndex( student => student.id === id );

    if ( index === -1 ) {
      return res.status(400).json({ message: 'No existe un Estudiante con el ID proporcionado.'});
    }

    students[index] = {
      id: id,
      name: name,
      career: career,
      age: age,
      gender: gender,
      subject01: subject01,
      subject02: subject02,
      subject03: subject03
    }

    res.status(200).json({
      message: 'Alumno correctamente actualizado.'
    });

  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar actualizar los datos del alumno.'});
  }
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const student = students.find( student => student.id === id );

  if ( !student ) {
    return res.status(404).json({ message: 'No se encontro un Estudiante con ese ID.'});
  }

  res.status(200).json(student);

});

module.exports = router;

