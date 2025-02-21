const express = require('express');
const router = express.Router();
const supervisors = require('../data/supervisor');

router.use(express.json());

router.get('/', (req, res) => {
  res.status(200).json(supervisors);
});

router.get('/search/:id', (req, res) => {
  const { id } = req.params;
  const supervisorId = Number(id);

  //console.log(`Buscando supervisor por ID: ${supervisorId}`);
  //console.log(`Supervisores totales:`, supervisors);

  const supervisor = supervisors.find(s => s.supervisorId === supervisorId);

  if (!supervisor) {
    return res.status(404).json({ message: `No se encontró un supervisor con el ID: ${supervisorId}.` });
  }

  res.status(200).json(supervisor);
});

router.post('/', (req, res) => {
  try {
    const { name, degree, shift } = req.body;

    if (!name || !degree || !shift) {
      return res.status(400).json({ message: 'Todos los campos son necesarios' });
    }

    const existingSupervisor = supervisors.find(supervisor => supervisor.name === name);
    if (existingSupervisor) {
      return res.status(400).json({ message: 'El supervisor ya existe' });
    }

    const maxSupervisorId = supervisors.length > 0 ? Math.max(...supervisors.map(s => s.supervisorId)) : 0;

    const newSupervisor = {
      supervisorId: maxSupervisorId + 1,
      name: name,
      degree: degree,
      shift: shift
    };

    supervisors.push(newSupervisor);

    res.status(201).json({
      message: 'Se dio de alta al supervisor',
      data: newSupervisor
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});

router.patch('/search/:id', (req, res) => {
  try {
    const { id } = req.params;
    const supervisorId = Number(id);

    const supervisor = supervisors.find(s => s.supervisorId === supervisorId);
    if (!supervisor) {
      return res.status(404).json({ message: 'No existe un supervisor con el ID proporcionado.' });
    }

    const { name, degree, shift } = req.body;

    if (name !== undefined) supervisor.name = name;
    if (degree !== undefined) supervisor.degree = degree;
    if (shift !== undefined) supervisor.shift = shift;

    res.status(200).json({ message: 'Supervisor actualizado correctamente.', data: supervisor });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
  }
});

router.delete('/search/:id', (req, res) =>{
  const {id} = req.params;
  const supervisorIndex = supervisors.findIndex(sup => sup.supervisorId === Number(id));

  if(supervisorIndex === -1) return res.status(404).json({message: 'No existe el supervisor con ese Id'});

  const deletedSupervisor = supervisors.splice(supervisorIndex,1);
  res.status(200).json({message: 'Supervisor eliminado correctamente', data: deletedSupervisor[0]});
});

module.exports = router;
