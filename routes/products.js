var express = require('express');
var router = express.Router();
var [getProducts, insertProduct] = require('../controllers/product');
var middleware = require("../middleware/middleware.js");
const ROLES = require("../constants")["ROLES"];

/* GET product listing. */
router.get('/', middleware.checkToken(Object.values(ROLES)), async function (req, res, next) {
  const products = await getProducts();
  console.warn('products->', products);
  res.send(products);
});
/**
 * POST product
 */
router.post('/', middleware.checkToken([ROLES.ADMIN]), async function (req, res, next) {
  const newProduct = await insertProduct(req.body);
  console.warn('insert products->', newProduct);
  res.send(newProduct);
});

module.exports = router;
