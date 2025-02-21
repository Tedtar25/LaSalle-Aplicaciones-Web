class CategoryServices {
  constructor() {
    this.categories = [
      {
        id: 1,
        categoryName: 'Sauces',
        description: 'Salsas para acompañar',
        active: 'yes',
      },
      {
        id: 2,
        categoryName: 'Cereales Interdimensionales',
        description: 'Cereales de diferentes dimensiones',
        active: 'yes',
      },
      {
        id: 3,
        categoryName: 'Juegos y Entretenimiento',
        description: 'Juegos de sala y diversiones',
        active: 'yes',
      },
      {
        id: 4,
        categoryName: 'Snacks Locos',
        description: 'Snacks divertidos y locos',
        active: 'yes',
      },
      {
        id: 5,
        categoryName: 'Cereales Ninios',
        description: 'Variedades de cereales para niños',
        active: 'no',
      },
    ];
  }

  async getAll() {
    return this.categories;
  }

  async getById(id) {
    return this.categories.find((category) => category.id == id) || null;
  }

  async create(data) {
    const maxId =
      this.categories.length > 0
        ? Math.max(...this.categories.map((category) => category.id))
        : 0;
    const newCategory = { id: maxId + 1, ...data };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, changes) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id == id,
    );
    if (categoryIndex === -1) return null;

    const category = this.categories[categoryIndex];
    this.categories[categoryIndex] = { ...category, ...changes };
    return this.categories[categoryIndex];
  }

  async delete(id) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id == id,
    );
    if (categoryIndex === -1) return null;

    const deletedCategory = this.categories.splice(categoryIndex, 1);
    return deletedCategory[0];
  }
}

module.exports = CategoryServices;
