const express = require('express');
const router = express.Router();
const classrooms = require('../data/classrooms');

router.get('/', (req,res) => {
  res.status(200).json(classrooms);
});

router.post('/', (req, res) => {
  try {
    const { building } = req.body;

    if ( !building ) {
      return res.status(400).json({ error: 'Es necesario ingresar la letra del Edificio'});
    }

    const existingClassroom = classrooms.find(classroom => classroom.building === building);

    if (existingClassroom) {
      return res.status(400).json({ error: 'El Edificio ya existe.' });
    }

    const newClassroom = {
      id: classrooms.length + 1,
      building: building
    }

    classrooms.push(newClassroom);

    res.status(201).json({
      message: 'Nueva aula creada con exito.',
      Aula: newClassroom
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al intentar crear una aula' });
  }
});

router.put('/', (req, res) => {
  try {
    const { id, building } = req.body;

    if ( !id || !building) {
      return res.status(400).json({ error: 'Es necesario ingresar el ID de la Aula a modificar y su letra.'});
    }

    const index = classrooms.findIndex( classroom => classroom.id === id );

    if ( index === -1 ) {
      return res.status(404).json({ message: 'No existe una Aula con el ID proporcionado.'});
    }

    classrooms[index] = {
      id: id,
      building: building
    }

    res.status(200).json({ message: 'Aula correctamente actualizada.'});
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar actualizar el aula.'});
  }
});

router.get('/:id', (req, res) => {
  const id = Number( req.params.id );
  const classroom = classrooms.find( classroom => classroom.id === id );

  if ( !classroom ) {
    return res.status(404).json({ mesage: 'No se encontro un estudiante con ese ID.'});
  }

  res.status(200).json(classroom);
});

module.exports = router;
