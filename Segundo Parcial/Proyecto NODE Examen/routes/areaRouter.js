const express = require('express');
const router = express.Router();
const areas = require('../data/area');

router.get('/', (req, res) => {
  res.status(200).json(areas);
});

router.post('/', (req, res) => {
  try {
    const { name, building } = req.body;

    if (!name || !building) {
      return res.status(400).json({ error: 'Es necesario ingresar el nombre del área y el edificio.' });
    }

    const existingArea = areas.find(area => area.name === name && area.building === building);
    if (existingArea) {
      return res.status(409).json({ error: 'El área ya existe en el edificio proporcionado.' });
    }

    const maxAreaId = areas.length > 0 ? Math.max(...areas.map(area => area.areaId)) : 0;

    const newArea = {
      areaId: maxAreaId + 1,
      name: name,
      building: building
    };

    areas.push(newArea);

    res.status(201).json({
      message: 'Nueva área creada con éxito.',
      area: newArea
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al intentar crear una nueva área.' });
  }
});

router.patch('/search/:id', (req, res) => {
  try {
    const areaId = Number(req.params.id);
    const { name, building } = req.body; 

    const area = areas.find(area => area.areaId === areaId);

    if (!area) {
      return res.status(404).json({ message: 'No existe un area con el ID proporcionado.' });
    }

    if (name !== undefined) area.name = name;
    if (building !== undefined) area.building = building;

    res.status(200).json({
      message: 'Area actualizada correctamente.',
      area: area
    });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar actualizar el area.' });
  }
});

router.get('/search/:id', (req, res) => {
  const areaId = Number(req.params.id);
  const area = areas.find(area => area.areaId === areaId);

  if (!area) {
    return res.status(404).json({ message: 'No se encontro un area con ese ID.' });
  }

  res.status(200).json(area);
});

router.delete('/search/:id', (req, res) =>{
  const {id} = req.params;
  const areaIndex = areas.findIndex(area => area.areaIndex === Number(id));

  if(areaIndex === -1) return res.status(404).json({message: 'El area no ha podido ser encontrada con ese ID'});
  const deletedArea = areas.splice(areaIndex, 1);
  res.status(200).json({message: 'El area ha sido eliminada con éxito', data: deletedArea})
});

module.exports = router;
