const pool = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO products (title, price, imageUrl, description) VALUES ($1, $2, $3, $4)",
        [this.title, this.price, this.imageUrl, this.description]
      );
      return result;
    } finally {
      client.release();
    }
  }

  static deleteById(id) {}

  static async fetchAll() {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM products");
      return result.rows;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    } finally {
      client.release();
    }
  }
  static async findById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
};
