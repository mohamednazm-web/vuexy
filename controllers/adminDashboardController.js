const Product = require('./../models/productModel');
const Banners = require('./../models/bannerModel');
const BannerBottom = require('./../models/bannerBottomModel');
const Vedios = require('./../models/vedioModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const fileHelper = require('../utils/file');
const Contacts = require('./../models/contactModel');
const fs = require('fs');

const ITEMS_PER_PAGE = 8;

exports.createProductWithAdminDashboard = async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  const productName = req.body.productName; // for kurdish
  const productNameEnglish = req.body.productNameEnglish;
  const productNameArabic = req.body.productNameArabic;
  const categories = req.body.categories;
  const description = req.body.description;
  const descriptionEnglish = req.body.descriptionEnglish;
  const descriptionArabic = req.body.descriptionArabic;
  const price = req.body.price;
  const time = req.body.time;
  const brandName = req.body.brandName;
  const information = req.body.information;

  let fileSetUpUrl = '';
  if (req.files['fileSetUp']) {
    fileSetUpUrl = req.files['fileSetUp'][0].path;
  }
  let sliderImageUrl = '';
  if (req.files['sliderImage']) {
    sliderImageUrl = req.files['sliderImage'][0].path;
  }
  let imageUrl = '';
  if (req.files['image']) {
    imageUrl = req.files['image'][0].path;
  }
  let subImage1Url = null;
  if (req.files['subImage1']) {
    subImage1Url = req.files['subImage1'][0].path;
  }
  let subImage2Url = null;
  if (req.files['subImage2']) {
    subImage2Url = req.files['subImage2'][0].path;
  }
  let subImage3Url = null;
  if (req.files['subImage3']) {
    subImage3Url = req.files['subImage3'][0].path;
  }
  let subImage4Url = null;
  if (req.files['subImage4']) {
    subImage4Url = req.files['subImage4'][0].path;
  }
  let subImage5Url = null;
  if (req.files['subImage5']) {
    subImage5Url = req.files['subImage5'][0].path;
  }
  let subImage6Url = null;
  if (req.files['subImage6']) {
    subImage6Url = req.files['subImage6'][0].path;
  }
  let subImage7Url = null;
  if (req.files['subImage7']) {
    subImage7Url = req.files['subImage7'][0].path;
  }
  let subImage8Url = null;
  if (req.files['subImage8']) {
    subImage8Url = req.files['subImage8'][0].path;
  }
  let subImage9Url = null;
  if (req.files['subImage9']) {
    subImage9Url = req.files['subImage9'][0].path;
  }
  let subImage10Url = null;
  if (req.files['subImage10']) {
    subImage10Url = req.files['subImage10'][0].path;
  }
  let subImage11Url = null;
  if (req.files['subImage11']) {
    subImage11Url = req.files['subImage11'][0].path;
  }
  let subImage12Url = null;
  if (req.files['subImage12']) {
    subImage12Url = req.files['subImage12'][0].path;
  }
  let subImage13Url = null;
  if (req.files['subImage13']) {
    subImage13Url = req.files['subImage13'][0].path;
  }
  let subImage14Url = null;
  if (req.files['subImage14']) {
    subImage14Url = req.files['subImage14'][0].path;
  }
  let subImage15Url = null;
  if (req.files['subImage15']) {
    subImage15Url = req.files['subImage15'][0].path;
  }
  let subImage16Url = null;
  if (req.files['subImage16']) {
    subImage16Url = req.files['subImage16'][0].path;
  }
  let subImage17Url = null;
  if (req.files['subImage17']) {
    subImage17Url = req.files['subImage17'][0].path;
  }
  let subImage18Url = null;
  if (req.files['subImage18']) {
    subImage18Url = req.files['subImage18'][0].path;
  }
  let subImage19Url = null;
  if (req.files['subImage19']) {
    subImage19Url = req.files['subImage19'][0].path;
  }
  let subImage20Url = null;
  if (req.files['subImage20']) {
    subImage20Url = req.files['subImage20'][0].path;
  }
  let backgroundImageForProductUrl = '';
  if (req.files['backgroundImageForProduct']) {
    backgroundImageForProductUrl =
      req.files['backgroundImageForProduct'][0].path;
  }
  ////////////////////////////////////////////////////////////////////////
  const product = new Product({
    productName: productName,
    productNameEnglish: productNameEnglish,
    productNameArabic: productNameArabic,
    sliderImage: sliderImageUrl,
    image: imageUrl,
    subImage1: subImage1Url,
    subImage2: subImage2Url,
    subImage3: subImage3Url,
    subImage4: subImage4Url,
    backgroundImageForProduct: backgroundImageForProductUrl,
    categories: categories,
    description: description,
    descriptionEnglish: descriptionEnglish,
    descriptionArabic: descriptionArabic,
    price: price,
    time: time,
    brandName: brandName,
    information: information,
    fileSetUp: fileSetUpUrl,
    subImage5: subImage5Url,
    subImage6: subImage6Url,
    subImage7: subImage7Url,
    subImage8: subImage8Url,
    subImage9: subImage9Url,
    subImage10: subImage10Url,
    subImage11: subImage11Url,
    subImage12: subImage12Url,
    subImage13: subImage13Url,
    subImage14: subImage14Url,
    subImage15: subImage15Url,
    subImage16: subImage16Url,
    subImage17: subImage17Url,
    subImage18: subImage18Url,
    subImage19: subImage19Url,
    subImage20: subImage20Url
  });

  const newProduct = await Product.create(product);

  const doc = await Categories.updateMany(
    { _id: newProduct.categories },
    { $push: { products: newProduct._id } }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  } else {
    req.flash('messageSuccessAdd', 'ئەم بەرهەمە بەسەرکەوتوویی زیادکرا');
    res.redirect('back');
  }
};

exports.createVedioProduct = async (req, res, next) => {
  const title = req.body.title;
  const titleArabic = req.body.titleArabic;
  const titleEnglish = req.body.titleEnglish;
  const vedio = req.body.vedio;

  await Vedios.findOne({ vedio: vedio }).then(resDoc => {
    if (resDoc) {
      // console.log("this video is already exsits");
      req.flash('errMessageVideoExist', 'ئەم ڤیدیۆیە بوونی هەیە');
      res.redirect('/admin_dashboard/add-product-vedio');
    } else {
      let imageUrl = '';
      if (req.files['vedioImage']) {
        imageUrl = req.files['vedioImage'][0].path;
      }
      ////////////////////////////////////////////////////////////////////////
      const product = new Vedios({
        titleArabic: titleArabic,
        titleEnglish: titleEnglish,
        title: title,
        vedio: vedio,
        image: imageUrl
      });

      const newProduct = Vedios.create(product);

      if (!newProduct) {
        return next(new AppError('No document found with that ID', 404));
      } else {
        req.flash('messageSuccessAdd', 'ئەم بەرهەمە بەسەرکەوتوویی زیادکرا');
        res.redirect('back');
      }
    }
  });
};

exports.sendContact = async (req, res, next) => {
  const product = req.body;
  const i18n = res.setLocale(req.cookies.i18n);
  const newProduct = await Contacts.create(product, function(err, result) {
    if (err) {
      next();
    }
    if (result) {
      // res.redirect('/contact')
      res.render('pages/contact', {
        message: 'نامەکەت بە سەرکەوتوویی نێردرا',
        i18n: res,
        selectedI18n: i18n
      });
    }
  });
};

exports.showContacts = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Contacts.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Contacts.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('dashboard/contacts/index', {
    contacts: products,
    i18n: res,
    selectedI18n: i18n,
    totalNumItems: totalItems,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
  });
};

exports.deleteProductWithAdminDashboard = async (req, res, next) => {
  const _id = req.body.productId;
  const product = await Product.findOne({ _id });

  if (product) {
    deleteFileFunction();
  }

  function deleteFileFunction() {
    setTimeout(function() {
      fileHelper.deleteFile(product.image);
      //fileHelper.deleteFile(product.fileSetUp);
      fileHelper.deleteFile(product.backgroundImageForProduct);
      //fileHelper.deleteFile(product.sliderImage);
      fileHelper.deleteFile(product.subImage1);
      fileHelper.deleteFile(product.subImage2);
      fileHelper.deleteFile(product.subImage3);
      fileHelper.deleteFile(product.subImage4);
      fileHelper.deleteFile(product.subImage5);
      fileHelper.deleteFile(product.subImage6);
      fileHelper.deleteFile(product.subImage7);
      fileHelper.deleteFile(product.subImage8);
      fileHelper.deleteFile(product.subImage9);
      fileHelper.deleteFile(product.subImage10);
      fileHelper.deleteFile(product.subImage11);
      fileHelper.deleteFile(product.subImage12);
      fileHelper.deleteFile(product.subImage13);
      fileHelper.deleteFile(product.subImage14);
      fileHelper.deleteFile(product.subImage15);
      fileHelper.deleteFile(product.subImage16);
      fileHelper.deleteFile(product.subImage17);
      fileHelper.deleteFile(product.subImage18);
      fileHelper.deleteFile(product.subImage19);
      fileHelper.deleteFile(product.subImage20);
    }, 10000);
  }

  const detailDelete = await product.remove();

  if (detailDelete) {
    const doc = await Categories.updateMany(
      { _id: product.categories },
      { $pull: { products: product._id } }
    );
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    } else {
      res.redirect('back'); // agadar ba pewista wa be agar na refersh nabitawa zor mwhima wakw framwork ish daka refersh daka
    }
  }
};

exports.deleteVideoWithAdminDashboard = async (req, res, next) => {
  const _id = req.body.productId;
  const product = await Vedios.findOne({ _id });

  if (product) {
    deleteFileFunction();
  }

  function deleteFileFunction() {
    setTimeout(function() {
      fileHelper.deleteFile(product.image);
    }, 10000);
  }

  const detailDelete = await product.remove();

  if (detailDelete) {
    res.redirect('back'); // agadar ba pewista wa be agar na refersh nabitawa zor mwhima wakw framwork ish daka refersh daka
  }
};

exports.deleteSubImage1 = async (req, res, next) => {
  const _id = req.params.id;
  console.log(_id);
  console.log('hello');
  const product = await Product.findById(_id).then(pro => {
    if (pro.subImage1) {
      fileHelper.deleteFile(pro.subImage1, function(err) {
        if (err) {
          next();
        }
      });
    }
    // function deleteFileFunction() {
    //     setTimeout(function () {
    //         fileHelper.deleteFile(pro.subImage1);
    //     }, 10000);
    // }
    console.log(pro.subImage1);
    pro.subImage1 = '';
    return pro.save();
  });
  console.log('new' + product);
  if (product) {
    res.redirect('/admin_dashboard/update-product/' + _id);
  }
};

exports.updateProductWithAdminDashboard = async (req, res, next) => {
  const id = req.params.id;
  const productName = req.body.productName;
  const productNameEnglish = req.body.productNameEnglish;
  const productNameArabic = req.body.productNameArabic;
  console.log(productName);
  let fileSetUpUrl = '';
  if (req.files['fileSetUp']) {
    fileSetUpUrl = req.files['fileSetUp'][0].path;
  }
  let sliderImageUrl = '';
  if (req.files['sliderImage']) {
    sliderImageUrl = req.files['sliderImage'][0].path;
  }
  let imageUrl = '';
  if (req.files['image']) {
    imageUrl = req.files['image'][0].path;
  }
  let subImage1Url = null;
  if (req.files['subImage1']) {
    subImage1Url = req.files['subImage1'][0].path;
  }
  let subImage2Url = null;
  if (req.files['subImage2']) {
    subImage2Url = req.files['subImage2'][0].path;
  }
  let subImage3Url = null;
  if (req.files['subImage3']) {
    subImage3Url = req.files['subImage3'][0].path;
  }
  let subImage4Url = null;
  if (req.files['subImage4']) {
    subImage4Url = req.files['subImage4'][0].path;
  }
  let subImage5Url = null;
  if (req.files['subImage5']) {
    subImage5Url = req.files['subImage5'][0].path;
  }
  let subImage6Url = null;
  if (req.files['subImage6']) {
    subImage6Url = req.files['subImage6'][0].path;
  }
  let subImage7Url = null;
  if (req.files['subImage7']) {
    subImage7Url = req.files['subImage7'][0].path;
  }
  let subImage8Url = null;
  if (req.files['subImage8']) {
    subImage8Url = req.files['subImage8'][0].path;
  }
  let subImage9Url = null;
  if (req.files['subImage9']) {
    subImage9Url = req.files['subImage9'][0].path;
  }
  let subImage10Url = null;
  if (req.files['subImage10']) {
    subImage10Url = req.files['subImage10'][0].path;
  }
  let subImage11Url = null;
  if (req.files['subImage11']) {
    subImage11Url = req.files['subImage11'][0].path;
  }
  let subImage12Url = null;
  if (req.files['subImage12']) {
    subImage12Url = req.files['subImage12'][0].path;
  }
  let subImage13Url = null;
  if (req.files['subImage13']) {
    subImage13Url = req.files['subImage13'][0].path;
  }
  let subImage14Url = null;
  if (req.files['subImage14']) {
    subImage14Url = req.files['subImage14'][0].path;
  }
  let subImage15Url = null;
  if (req.files['subImage15']) {
    subImage15Url = req.files['subImage15'][0].path;
  }
  let subImage16Url = null;
  if (req.files['subImage16']) {
    subImage16Url = req.files['subImage16'][0].path;
  }
  let subImage17Url = null;
  if (req.files['subImage17']) {
    subImage17Url = req.files['subImage17'][0].path;
  }
  let subImage18Url = null;
  if (req.files['subImage18']) {
    subImage18Url = req.files['subImage18'][0].path;
  }
  let subImage19Url = null;
  if (req.files['subImage19']) {
    subImage19Url = req.files['subImage19'][0].path;
  }
  let subImage20Url = null;
  if (req.files['subImage20']) {
    subImage20Url = req.files['subImage20'][0].path;
  }
  let backgroundImageForProductUrl = '';
  if (req.files['backgroundImageForProduct']) {
    backgroundImageForProductUrl =
      req.files['backgroundImageForProduct'][0].path;
  }

  //const categories = req.body.categories;
  const description = req.body.description;
  const descriptionEnglish = req.body.descriptionEnglish;
  const descriptionArabic = req.body.descriptionArabic;
  const price = req.body.price;
  const time = req.body.time;
  const brandName = req.body.brandName;
  const information = req.body.information;
  ////////////////////////////////////////////////////////////////////////
  await Product.findById(req.params.id)
    .then(product => {
      product.productName = productName;
      product.productNameEnglish = productNameEnglish;
      product.productNameArabic = productNameArabic;
      product.price = price;
      product.description = description;
      product.descriptionEnglish = descriptionEnglish;
      product.descriptionArabic = descriptionArabic;
      product.time = time;
      product.brandName = brandName;
      product.information = information;
      if (fileSetUpUrl) {
        if (product.fileSetUp) {
          fileHelper.deleteFile(product.fileSetUp, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.fileSetUp = fileSetUpUrl;
      }
      //product.categories = categories;
      if (sliderImageUrl) {
        if (product.sliderImage) {
          fileHelper.deleteFile(product.sliderImage, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.sliderImage = sliderImageUrl;
      }
      if (imageUrl) {
        if (product.imageUrl) {
          fileHelper.deleteFile(product.imageUrl, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.image = imageUrl;
      }
      if (backgroundImageForProductUrl) {
        if (product.backgroundImageForProduct) {
          fileHelper.deleteFile(product.backgroundImageForProduct, function(
            err
          ) {
            if (err) {
              next();
            }
          });
        }
        product.backgroundImageForProduct = backgroundImageForProductUrl;
      }
      if (subImage1Url) {
        if (product.subImage1) {
          fileHelper.deleteFile(product.subImage1, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage1 = subImage1Url;
      }
      if (subImage2Url) {
        if (product.subImage2) {
          fileHelper.deleteFile(product.subImage2, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage2 = subImage2Url;
      }
      if (subImage3Url) {
        if (product.subImage3) {
          fileHelper.deleteFile(product.subImage3, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage3 = subImage3Url;
      }
      if (subImage4Url) {
        if (product.subImage4) {
          fileHelper.deleteFile(product.subImage4, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage4 = subImage4Url;
      }
      if (subImage5Url) {
        if (product.subImage5) {
          fileHelper.deleteFile(product.subImage5, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage5 = subImage5Url;
      }
      if (subImage6Url) {
        if (product.subImage6) {
          fileHelper.deleteFile(product.subImage6, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage6 = subImage6Url;
      }
      if (subImage7Url) {
        if (product.subImage7) {
          fileHelper.deleteFile(product.subImage7, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage7 = subImage7Url;
      }
      if (subImage8Url) {
        if (product.subImage8) {
          fileHelper.deleteFile(product.subImage8, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage8 = subImage8Url;
      }
      if (subImage9Url) {
        if (product.subImage9) {
          fileHelper.deleteFile(product.subImage9, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage9 = subImage9Url;
      }
      if (subImage10Url) {
        if (product.subImage10) {
          fileHelper.deleteFile(product.subImage10, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage10 = subImage10Url;
      }
      if (subImage11Url) {
        if (product.subImage11) {
          fileHelper.deleteFile(product.subImage11, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage11 = subImage11Url;
      }
      if (subImage12Url) {
        if (product.subImage12) {
          fileHelper.deleteFile(product.subImage12, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage12 = subImage12Url;
      }
      if (subImage13Url) {
        if (product.subImage13) {
          fileHelper.deleteFile(product.subImage13, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage13 = subImage13Url;
      }
      if (subImage14Url) {
        if (product.subImage14) {
          fileHelper.deleteFile(product.subImage14, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage14 = subImage14Url;
      }
      if (subImage15Url) {
        if (product.subImage15) {
          fileHelper.deleteFile(product.subImage15, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage15 = subImage15Url;
      }
      if (subImage16Url) {
        if (product.subImage16) {
          fileHelper.deleteFile(product.subImage16, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage16 = subImage16Url;
      }
      if (subImage17Url) {
        if (product.subImage17) {
          fileHelper.deleteFile(product.subImage17, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage17 = subImage17Url;
      }
      if (subImage18Url) {
        if (product.subImage18) {
          fileHelper.deleteFile(product.subImage18, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage18 = subImage18Url;
      }
      if (subImage19Url) {
        if (product.subImage19) {
          fileHelper.deleteFile(product.subImage19, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage19 = subImage19Url;
      }
      if (subImage20Url) {
        if (product.subImage20) {
          fileHelper.deleteFile(product.subImage20, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.subImage20 = subImage20Url;
      }
      return product.save().then(result => {});
    })
    .catch(err => {});

  let productNameUpdate = '';
  let productNameEnglishUpdate = '';
  let productNameArabicUpdate = '';
  let imageUpdate = '';
  let subImage1Update = '';
  let subImage2Update = '';
  let subImage3Update = '';
  let subImage4Update = '';
  let subImage5Update = '';
  let subImage6Update = '';
  let subImage7Update = '';
  let subImage8Update = '';
  let subImage9Update = '';
  let subImage10Update = '';
  let subImage11Update = '';
  let subImage12Update = '';
  let subImage13Update = '';
  let subImage14Update = '';
  let subImage15Update = '';
  let subImage16Update = '';
  let subImage17Update = '';
  let subImage18Update = '';
  let subImage19Update = '';
  let subImage20Update = '';
  let backgroundImageForProductUpdate = '';
  let descriptionUpdate = '';
  let descriptionEnglishUpdate = '';
  let descriptionArabicUpdate = '';
  let sliderImageUpdate = '';
  let brandNameUpdate = '';
  let informationUpdate = '';
  let priceUpdate = '';
  //let categoriesUpdate = '';
  let timeUpdate = '';
  let fileSetUpUpdate = '';

  await Product.findById(id).then(product => {
    productNameUpdate = product.productName;
    productNameEnglishUpdate = product.productNameEnglish;
    productNameArabicUpdate = product.productNameArabic;
    imageUpdate = product.image;
    subImage1Update = product.subImage1;
    subImage2Update = product.subImage2;
    subImage3Update = product.subImage3;
    subImage4Update = product.subImage4;
    subImage5Update = product.subImage5;
    subImage6Update = product.subImage6;
    subImage7Update = product.subImage7;
    subImage8Update = product.subImage8;
    subImage9Update = product.subImage9;
    subImage10Update = product.subImage10;
    subImage11Update = product.subImage11;
    subImage12Update = product.subImage12;
    subImage13Update = product.subImage13;
    subImage14Update = product.subImage14;
    subImage15Update = product.subImage15;
    subImage16Update = product.subImage16;
    subImage17Update = product.subImage17;
    subImage18Update = product.subImage18;
    subImage19Update = product.subImage19;
    subImage20Update = product.subImage20;
    backgroundImageForProductUpdate = product.backgroundImageForProduct;
    sliderImageUpdate = product.sliderImage;
    brandNameUpdate = product.brandName;
    priceUpdate = product.price;
    informationUpdate = product.information;
    descriptionUpdate = product.description;
    descriptionEnglishUpdate = product.descriptionEnglish;
    descriptionArabicUpdate = product.descriptionArabic;
    //categoriesUpdate = product.categories;
    timeUpdate = product.timeUpdate;
    fileSetUpUpdate = product.fileSetUp;
  });

  const doc = await Categories.updateOne(
    {
      products: {
        _id: id
      }
    },
    {
      $set: {
        productName: productNameUpdate,
        productNameEnglish: productNameEnglishUpdate,
        productNameArabic: productNameArabicUpdate,
        image: imageUpdate,
        subImage1: subImage1Update,
        subImage2: subImage2Update,
        subImage3: subImage3Update,
        subImage4: subImage4Update,
        subImage5: subImage5Update,
        subImage6: subImage6Update,
        subImage7: subImage7Update,
        subImage8: subImage8Update,
        subImage9: subImage9Update,
        subImage10: subImage10Update,
        subImage11: subImage11Update,
        subImage12: subImage12Update,
        subImage13: subImage13Update,
        subImage14: subImage14Update,
        subImage15: subImage15Update,
        subImage16: subImage16Update,
        subImage17: subImage17Update,
        subImage18: subImage18Update,
        subImage19: subImage19Update,
        subImage20: subImage20Update,
        time: timeUpdate,
        backgroundImageForProduct: backgroundImageForProductUpdate,
        description: descriptionUpdate,
        descriptionEnglish: descriptionEnglishUpdate,
        descriptionArabic: descriptionArabicUpdate,
        sliderImage: sliderImageUpdate,
        //categories: categoriesUpdate,
        brandName: brandNameUpdate,
        information: informationUpdate,
        fileSetUp: fileSetUpUpdate,
        price: priceUpdate
      }
    }
  );
  if (doc) {
    res.redirect('back');
  }
};

exports.updateBannerImageWithAdminDashboard = async (req, res, next) => {
  let bannerImageUrl = '';
  if (req.files['imageBanner']) {
    bannerImageUrl = req.files['imageBanner'][0].path;
  }

  const doc = await Banners.findById(req.params.id)
    .then(product => {
      if (bannerImageUrl) {
        if (product.image) {
          fileHelper.deleteFile(product.image, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.image = bannerImageUrl;
      }
      return product.save().then((result, err) => {
        if (result) {
          res.redirect('/admin_dashboard/updateBannerImage');
        }
        if (err) {
          next();
        }
      });
    })
    .catch(err => {
      if (err) {
        next();
      }
    });
};

exports.updateBannerImageBottomWithAdminDashboard = async (req, res, next) => {
  let bannerImageUrl = '';
  if (req.files['imageBannerBottom']) {
    bannerImageUrl = req.files['imageBannerBottom'][0].path;
  }

  const doc = await BannerBottom.findById(req.params.id)
    .then(product => {
      if (bannerImageUrl) {
        if (product.image) {
          fileHelper.deleteFile(product.image, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.image = bannerImageUrl;
      }
      return product.save().then((result, err) => {
        if (result) {
          res.redirect('back');
        }
        if (err) {
          next();
        }
      });
    })
    .catch(err => {
      if (err) {
        next();
      }
    });
};

exports.updateProductVedioWithAdminDashboard = async (req, res, next) => {
  let title = req.body.title;
  let titleArabic = req.body.titleArabic;
  let titleEnglish = req.body.titleEnglish;
  let vedioUrl = req.body.vedio;
  console.log(vedioUrl);
  let vedioImageUrl = '';
  if (req.files['vedioImage']) {
    vedioImageUrl = req.files['vedioImage'][0].path;
  }

  await Vedios.findById(req.params.id)
    .then(product => {
      product.title = title;
      product.titleArabic = titleArabic;
      product.titleEnglish = titleEnglish;
      product.vedio = vedioUrl;
      if (vedioImageUrl) {
        if (product.image) {
          fileHelper.deleteFile(product.image, function(err) {
            if (err) {
              next();
            }
          });
        }
        product.image = vedioImageUrl;
      }
      return product.save().then((result, err) => {
        if (result) {
          res.redirect('/admin_dashboard/vedios');
        }
        if (err) {
          next();
        }
      });
    })
    .catch(err => {
      if (err) {
        next();
      }
    });
};
