const managers = require('./supervisor');
const areas = require('./area');

const departments = [
  { departmentNumber: 1, name: "Televisores", manager: managers[0].name, area: areas[0].name },
  { departmentNumber: 2, name: "Computacion", manager: managers[1].name, area: areas[0].name },
  { departmentNumber: 3, name: "Estufas", manager: managers[2].name, area: areas[1].name },
  { departmentNumber: 4, name: "Ropa de Hombre", manager: managers[3].name, area: areas[2].name },
  { departmentNumber: 5, name: "Converse", manager: managers[4].name, area: areas[3].name },
  { departmentNumber: 6, name: "Amplificadores", manager: managers[5].name, area: areas[5].name },
  { departmentNumber: 7, name: "LEGOS", manager: managers[0].name, area: areas[4].name },
  { departmentNumber: 8, name: "Guitarras", manager: managers[1].name, area: areas[5].name }
];

module.exports = departments;
