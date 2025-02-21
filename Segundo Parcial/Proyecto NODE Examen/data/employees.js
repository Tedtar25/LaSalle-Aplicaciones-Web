const departments = require('./department');

const employees = [
  {
    employeeNumber: 1,
    firstName: "Cesar",
    lastName: "Carrillo",
    age: 26,
    gender: "M",
    department1: departments[0].name,  // Televisores
    department2: departments[1].name,  // Electrodomesticos
    department3: departments[2].name   // Ropa de Mujer
  },
  {
    employeeNumber: 2,
    firstName: "David",
    lastName: "Fonseca",
    age: 20,
    gender: "M",
    department1: departments[3].name,  // Ropa de Hombre
    department2: departments[4].name,  // Converse
    department3: departments[5].name   // Audio
  },
  {
    employeeNumber: 3,
    firstName: "Emiliano",
    lastName: "Ramirez",
    age: 17,
    gender: "M",
    department1: departments[0].name,  // Televisores
    department2: departments[6].name,  // LEGOS
    department3: departments[1].name   // Electrodomesticos
  },
  {
    employeeNumber: 4,
    firstName: "Alvaro",
    lastName: "Mora",
    age: 18,
    gender: "M",
    department1: departments[2].name,  // Ropa de Mujer
    department2: departments[3].name,  // Ropa de Hombre
    department3: departments[7].name   // Cocina
  },
  {
    employeeNumber: 5,
    firstName: "Bon",
    lastName: "Scott",
    age: 33,
    gender: "M",
    department1: departments[4].name,  // Converse
    department2: departments[5].name,  // Audio
    department3: departments[6].name   // LEGOS
  },
  {
    employeeNumber: 6,
    firstName: "Angus",
    lastName: "Young",
    age: 68,
    gender: "M",
    department1: departments[0].name,  // Televisores
    department2: departments[1].name,  // Electrodomesticos
    department3: departments[7].name   // Cocina
  },
  {
    employeeNumber: 7,
    firstName: "Malcolm",
    lastName: "Young",
    age: 64,
    gender: "M",
    department1: departments[3].name,  // Ropa de Hombre
    department2: departments[4].name,  // Converse
    department3: departments[2].name   // Ropa de Mujer
  },
  {
    employeeNumber: 8,
    firstName: "Cliff",
    lastName: "Williams",
    age: 74,
    gender: "M",
    department1: departments[5].name,  // Audio
    department2: departments[6].name,  // LEGOS
    department3: departments[7].name   // Cocina
  },
  {
    employeeNumber: 9,
    firstName: "Phil",
    lastName: "Rudd",
    age: 69,
    gender: "M",
    department1: departments[0].name,  // Televisores
    department2: departments[3].name,  // Ropa de Hombre
    department3: departments[5].name   // Audio
  },
];

module.exports = employees;
