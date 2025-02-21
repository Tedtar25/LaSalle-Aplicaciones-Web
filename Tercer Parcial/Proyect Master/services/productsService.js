class ProductService {
  constructor() {
    this.products = [
      {
        id: 1,
        image: 'szechuan_sauce.jpg',
        productName: 'Szechuan Sauce',
        description: "La famosa salsa de McDonald's, ideal para tus comidas.",
        price: 5.99,
        stock: 100,
        category_id: 1,
        brand_id: 1,
      },
      {
        id: 2,
        image: 'blips_and_chitz.jpg',
        productName: 'Blips and Chitz Token',
        description: 'Tokens para jugar en la sala de juegos interdimensional.',
        price: 1.5,
        stock: 200,
        category_id: 3,
        brand_id: 2,
      },
      {
        id: 3,
        image: 'pickle_rick_snacks.jpg',
        productName: 'Pickle Rick Snacks',
        description: 'Snacks inspirados en Pickle Rick, perfectos para compartir.',
        price: 3.99,
        stock: 150,
        category_id: 4,
        brand_id: 4,
      },
      {
        id: 4,
        image: 'mr_meeseeks_box.jpg',
        productName: 'Mr. Meeseeks Box',
        description: 'Crea tu propio Meeseeks para ayudarte en tareas.',
        price: 19.99,
        stock: 50,
        category_id: 2,
        brand_id: 3,
      },
      {
        id: 5,
        image: 'wubba_lubba_dub_dub.jpg',
        productName: 'Wubba Lubba Dub Dub Merchandise',
        description: 'Mercancía oficial inspirada en la famosa frase de Rick.',
        price: 15.0,
        stock: 75,
        category_id: 1,
        brand_id: 5,
      },
    ];
  }

  async getAll() {
    return this.products;
  }

  async getById(id) {
    return this.products.find(product => product.id == id) || null;
  }

  async getByCategory(categoryId) {
    return this.products.filter(product => product.category_id == categoryId);
  }

  async getByBrand(brandId) {
    return this.products.filter(product => product.brand_id == brandId);
  }

  async create(data) {
    const maxId = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) : 0;
    const newProduct = { id: maxId + 1, ...data };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, changes) {
    const productIndex = this.products.findIndex(product => product.id == id);
    if (productIndex === -1) return null;

    const product = this.products[productIndex];
    this.products[productIndex] = { ...product, ...changes };
    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(product => product.id == id);
    if (productIndex === -1) return null;

    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct[0];
  }
}

module.exports = ProductService;
