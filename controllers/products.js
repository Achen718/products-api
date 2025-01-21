const Product = require('../models/Product');

exports.getAllProducts = (req, res, next) => {
  Product.fetchAllProducts()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getProductById = (req, res, next) => {
  const { id } = req.params;
  Product.fetchProductById(id)
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((err) => {
      next(err);
    });
};

exports.createProduct = (req, res, next) => {
  Product.createProduct(req.body)
    .then((product) => {
      res.status(201).json({ product });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const { id } = req.params;
  Product.updateProduct(id, req.body)
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const { id } = req.params;
  Product.deleteProduct(id)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => {
      next(err);
    });
};
