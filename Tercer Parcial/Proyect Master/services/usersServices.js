class UserServices {
  constructor() {
    this.users = [
      { id: 1, name: 'Micky Huidobro', username: 'micky1985', password: 'guitarra' },
      { id: 2, name: 'Paco Ayala', username: 'paco_rock', password: 'bajo' },
      { id: 3, name: 'Randy Ebright', username: 'randy_molotov', password: 'batería' },
      { id: 4, name: 'Tito Fuentes', username: 'tito_fuentes', password: 'voz' },
      { id: 5, name: 'Cesar Carrillo', username: 'cesar_carrillo', password: '123' },
    ];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000); // Simulación de un tiempo de respuesta asincrónico
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      const user = this.users.find(user => user.id == id);
      //const name = this.getTotal(); //ERROR A PROPOSITO PARA PROBAR errorHandler();
      resolve(user || null);
    });
  }

  async create(data) {
    return new Promise((resolve) => {
      const maxId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) : 0;
      const newUser = { id: maxId + 1, ...data };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  async update(id, changes) {
    return new Promise((resolve) => {
      const userIndex = this.users.findIndex(user => user.id == id);
      if (userIndex === -1) return resolve(null);

      const user = this.users[userIndex];
      this.users[userIndex] = { ...user, ...changes };
      resolve(this.users[userIndex]);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      const userIndex = this.users.findIndex(user => user.id == id);
      if (userIndex === -1) return resolve(null);

      const deletedUser = this.users.splice(userIndex, 1);
      resolve(deletedUser[0]);
    });
  }
}

module.exports = UserServices;
