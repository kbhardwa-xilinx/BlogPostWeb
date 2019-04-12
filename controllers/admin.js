const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: false
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const userID = 1;
    const createdTimeStamp = new Date();
    const product = new Product(null, userID, title, content, createdTimeStamp);
    product.save().then(() => {
      res.redirect('/');
    }).catch(err => {
      console.log(err);
    });
  };

  
  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodID = req.params.productID;
    console.log("Edit mode = ", editMode);
    Product.fetchByID(prodID, product => {
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });

    });
    
  };

  exports.postEditProduct = (req, res, next) => {
    
    const prodID = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedimageURL = req.body.imageUrl;
    const updatedDescription = req.body.description;
    console.log(req.body);
    console.log("Prod ID = ", prodID);
    const updatedProduct = new Product(prodID, updatedTitle, updatedimageURL, updatedDescription, updatedPrice);

    updatedProduct.save();
    res.redirect('/admin/products');

  };

  exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: 'admin/products',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS: true
        });
      });
  }

  exports.postDeleteProduct = (req, res, next) => {

    const prodID = req.body.productID;
    console.log('Product ID = ', prodID);
    Product.deleteByID(prodID);
    res.redirect('/admin/products');


  };


  exports.getRegisterUser = (req, res, next) => {
    res.render('admin/register', {
      pageTitle: 'Register',
      path: '/admin/register',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: false
    });
  };

  exports.postRegisterUser = (req, res, next) => {
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    console.log('Yes it come in the function');
    const user = new User(firstName, lastName, email, phoneNumber, password);

    user.save();
    res.redirect('/');
  };