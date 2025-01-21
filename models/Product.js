const db = require('../db/connect');

const Product = {
  fetchAllProducts: () => {
    return db.any('SELECT * FROM products').then((rows) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: 'No products found.' });
      }
      return rows;
    });
  },

  fetchProductById: (id) => {
    return db
      .oneOrNone('SELECT * FROM products WHERE id = $1', [id])
      .then((row) => {
        if (!row) {
          return Promise.reject({ status: 404, message: 'Product not found.' });
        }
        return row;
      });
  },

  createProduct: (product) => {
    const { name, description, price, stock } = product;
    return db.one(
      'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, stock]
    );
  },

  updateProduct: (id, product) => {
    const { name, description, price, stock } = product;
    return db
      .oneOrNone(
        'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
        [name, description, price, stock, id]
      )
      .then((row) => {
        if (!row) {
          return Promise.reject({ status: 404, message: 'Product not found.' });
        }
        return row;
      });
  },

  deleteProduct: (id) => {
    return db
      .result('DELETE FROM products WHERE id = $1', [id])
      .then((result) => {
        if (result.rowCount === 0) {
          return Promise.reject({ status: 404, message: 'Product not found.' });
        }
        return { message: 'Product deleted successfully.' };
      });
  },
};

module.exports = Product;
