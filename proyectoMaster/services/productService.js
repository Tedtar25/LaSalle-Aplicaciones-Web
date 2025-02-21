const faker = require('faker');

class productService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate(limit = 20) {
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getAll() {
    return new Promise((resolve, reject) =>{
      setTimeout(()=>{
        resolve(this.products);
      }, 10000);
    })
  }

  async getById(id) {
    //const name = this.getTotal(); //ERROR A PROPOSITO PARA PROBAR errorHandler();
    return this.products.find(product => product.id === id);
  }

  async update(id, changes) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return new Error('Product Not Found');
    const product = this.products[productIndex];
    this.products[productIndex] = { ...product, ...changes };
    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return new Error('Product Not Found');
    this.products.splice(productIndex, 1);
    return { id };
  }
}

module.exports = productService;
