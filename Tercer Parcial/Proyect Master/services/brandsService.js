class brandsService {
  constructor() {
    this.brands = [
      { id: 1, brandName: 'Szechuan Sauce', description: "Famosa salsa de McDonald's", active: 'yes' },
      { id: 2, brandName: 'Blips and Chitz', description: 'Sala de juegos interdimensional', active: 'yes' },
      { id: 3, brandName: 'Mr. Meeseeks Box', description: 'Crea un Meeseeks para ayudarte', active: 'yes' },
      { id: 4, brandName: 'Pickle Rick Snacks', description: 'Snacks inspirados en Pickle Rick', active: 'yes' },
      { id: 5, brandName: 'Wubba Lubba Dub Dub!', description: 'Famosa frase de Rick', active: 'yes' }
    ];
  }

  async create(data) {
    const maxId = this.brands.length > 0 ? Math.max(...this.brands.map((brand) => brand.id)) : 0;
    const newBrand = {
      id: maxId + 1,
      ...data,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  async getAll() {
    return this.brands;
  }

  async getById(id) {
    return this.brands.find(brand => brand.id === id);
  }

  async update(id, changes) {
    const brandIndex = this.brands.findIndex(brand => brand.id === id);
    if (brandIndex === -1) throw new Error('Brand Not Found');
    const brand = this.brands[brandIndex];
    this.brands[brandIndex] = { ...brand, ...changes };
    return this.brands[brandIndex];
  }

  async delete(id) {
    const brandIndex = this.brands.findIndex(brand => brand.id === id);
    if (brandIndex === -1) throw new Error('Brand Not Found');
    const deletedBrand = this.brands.splice(brandIndex, 1);
    return deletedBrand[0];
  }
}

module.exports = brandsService;
