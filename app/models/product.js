const db = require('../config/database');

class Product {
  constructor(name, description, price, images, type) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.type = type;
  }

  async save() {
    const sql = `
      INSERT INTO products (name, description, price, images, type)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [this.name, this.description, this.price, this.images, this.type];
    await db.run(sql, values);
  }

  static async getAllProducts() {
    const sql = `SELECT * FROM products`;
    const rows = await db.all(sql);
    return rows.map(row => new Product(row.name, row.description, row.price, row.images, row.type));
  }
}

module.exports = Product;