const Product = require('../models/product');
const Cart = require('../models/cart');

const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then( ([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true
    })  
  }).catch(
    err => {
      console.log(err);
    }
  );

  
};


exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID;
Product.fetchByID(prodID).then( ([rows, fieldData]) => {
  res.render('shop/product-detail', {
    product: rows[0], 
    pageTitle: rows.title,
    path: '/products'
  });
});
};

exports.getIndex = (req, res, next) => {

  Product.fetchAll().then( ([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Posts',
      path: '/'
    })
  }).catch(
    err => {
      console.log(err);
    }
  );
  
  
};

exports.getRegisterUser = (req, res, next) => {
  console.log("Haa yahan toh aaya salla");
  res.render('shop/register', {
    pageTitle: 'Register',
    path: '/shop/register',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};








exports.getCart = (req, res, next) => {
  Cart.getCart( cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', 
      {
       path: '/cart',
       pageTitle: 'Your Cart',
       products: cartProducts
      });
    })
  });
  
};

exports.postCart = (req, res, next) => {
  const prodID = req.body.productID;
  Product.fetchByID(prodID, (product) => {
    Cart.addProduct(prodID, product.price);
  })
  res.redirect('/products');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID;
  Product.fetchByID(prodID, product => {
    Cart.deleteProduct(prodID, product.price);
    res.redirect('/cart');
  });
  
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {path: '/orders', pageTitle: 'My Orders'});
};

exports.getCheckout = (req, res, next) =>{
res.render('shop/checkout', {path: '/checkout', pageTitle: 'Checkout Page'})
};