const Allviews = require('../models/viewsModel');
const Banners = require('../models/bannerModel');
const BannerBottom = require('../models/bannerBottomModel');
const Products = require('../models/productModel');
const Ticket = require('../models/ticktesModel');
const Categories = require('../models/categoriesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Vedios = require('../models/vedioModel');

const ITEMS_PER_PAGE = 8;

exports.products = catchAsync(async (req, res) => {
  const homePageViews = await Allviews.updateOne({
    $inc: { homePageHasView: 1 }
  });
  console.log(homePageViews);
  const i18n = res.setLocale(req.cookies.i18n);

  const banners = await Banners.find({})
    .sort({ _id: -1 })
    .limit(3);

  const bannerBottoms = await BannerBottom.find()
    .sort({ _id: -1 })
    .limit(3);

  const videos = await Vedios.find()
    .sort({ _id: -1 })
    .limit(4);

  let carBeautifings;
  const carBeautifingCategorey = await Categories.find({
    name: { $eq: 'carBeautifing' }
  }).populate('products');
  carBeautifingCategorey.forEach(function(categorey) {
    carBeautifings = categorey.products.reverse().slice(0, 20);
  });

  let carSales;
  const carSaleCategorey = await Categories.find({
    name: { $eq: 'carSales' }
  }).populate('products');
  carSaleCategorey.forEach(function(categorey) {
    carSales = categorey.products.reverse().slice(0, 5);
  });

  let suppliers;
  const supplierCategorey = await Categories.find({
    name: { $eq: 'suppliers' }
  }).populate('products');
  supplierCategorey.forEach(function(categorey) {
    suppliers = categorey.products.reverse().slice(0, 5);
  });

  res.status(200).render('pages/index', {
    carBeautifings: carBeautifings,
    carSales: carSales,
    suppliers: suppliers,
    banners: banners,
    videos,
    bannerBottoms: bannerBottoms,
    i18n: res,
    successMessageTicket: req.flash('successMessageTicket'),
    totalPriceMessage: req.flash('totalPriceMessage'),
    selectedI18n: i18n
  });
});

exports.adminDashboard = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  console.log(i18n);
  const totalNumOfTicket = await Ticket.find().countDocuments();

  const totalNumContacts = await Ticket.find().countDocuments();

  const totalNumOneWay = await Ticket.find({
    flyingType: { $eq: 0 }
  }).countDocuments();

  const totalNumReturn = await Ticket.find({
    flyingType: { $eq: 1 }
  }).countDocuments();

  const totalNumCarBeautifing = await Ticket.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13ea' }
  }).countDocuments();

  const totalNumSuppliers = await Ticket.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13eb' }
  }).countDocuments();

  let finalResViews = 0;
  await Allviews.find().then(res => {
    finalResViews = res[0].homePageHasView;
  });

  finalResViews = Math.trunc(finalResViews / 2);

  // SEND RESPONSE
  res.status(200).render('pages/dashboard', {
    totalNumOfTicket,
    totalNumOneWay,
    totalNumReturn,
    finalResViews,
    totalNumContacts,
    totalNumCarBeautifing,
    totalNumSuppliers,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.carSales = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13e9' }
  })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find({
        categories: { $eq: '60e21f9a5e082a12c8dc13e9' }
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });
  console.log(products);

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('pages/carSales', {
    carSales: products,
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
});

exports.productsOfdashboard = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find()
    .populate('categories', 'name')
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find()
        .populate('categories', 'name')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('pages/productsDashboard', {
    products,
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
});

exports.oneWayOfDashboard = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const tickets = await Ticket.find({ flyingType: { $eq: 0 } })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Ticket.find({ flyingType: { $eq: 0 } })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('dashboard/oneWay/index', {
    tickets: tickets,
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
});

exports.returnTicketOfDashboard = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const tickets = await Ticket.find({ flyingType: { $eq: 1 } })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Ticket.find({ flyingType: { $eq: 1 } })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('dashboard/return/index', {
    tickets: tickets,
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
});

exports.singleCarSales = catchAsync(async (req, res, next) => {
  let id = req.query.id;
  let categoreyId = req.query.categoreyId;
  const i18n = res.setLocale(req.cookies.i18n);

  const getOneProduct = await Products.find({
    _id: {
      $eq: id
    }
  }).populate('categories', 'name');
  //console.log(getOneProduct);

  const productsByCategory = await Products.find({
    categories: { _id: categoreyId }
  })
    .populate('categories', 'name')
    .limit(3);

  setTimeout(async function() {
    await Products.updateOne(
      // find record with id name
      { _id: id },
      // increment it's property called "hasViewd" by 1
      { $inc: { hasViewd: 1 } }
    );
  }, 1200000);

  // SEND RESPONSE
  res.status(200).render('pages/singleCarSales', {
    product: getOneProduct,
    relatedProducts: productsByCategory,
    i18n: res,
    selectedI18n: i18n
  });
});

/////////////////////CAR SALE START///////////////////////////////////////
exports.carSales = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13e9' }
  })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find({
        categories: { $eq: '60e21f9a5e082a12c8dc13e9' }
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });
  console.log(products);

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('pages/carSales', {
    carSales: products,
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
});
//////////////////////////CAR SALE END//////////////////////////////////
exports.singleCarBeautifing = catchAsync(async (req, res, next) => {
  let id = req.query.id;
  let categoreyId = req.query.categoreyId;
  const i18n = res.setLocale(req.cookies.i18n);

  const getOneProduct = await Products.find({
    _id: {
      $eq: id
    }
  }).populate('categories', 'name');
  //console.log(getOneProduct);

  const productsByCategory = await Products.find({
    categories: { _id: categoreyId }
  })
    .populate('categories', 'name')
    .limit(3);
  setTimeout(async function() {
    await Products.updateOne(
      // find record with id name
      { _id: id },
      // increment it's property called "hasViewd" by 1
      { $inc: { hasViewd: 1 } }
    );
  }, 1200000);

  // SEND RESPONSE
  res.status(200).render('pages/singleCarBeautifing', {
    product: getOneProduct,
    relatedProducts: productsByCategory,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.allSingleProducts = catchAsync(async (req, res, next) => {
  let id = req.query.id;
  const i18n = res.setLocale(req.cookies.i18n);

  const getOneProduct = await Products.find({
    _id: {
      $eq: id
    }
  }).populate('categories', 'name');

  //console.log(productsByCategory);

  // SEND RESPONSE
  res.status(200).render('pages/singleSupplier', {
    product: getOneProduct,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.singleSupplier = catchAsync(async (req, res, next) => {
  let id = req.query.id;
  let categoreyId = req.query.categoreyId;
  const i18n = res.setLocale(req.cookies.i18n);

  const getOneProduct = await Products.find({
    _id: {
      $eq: id
    }
  }).populate('categories', 'name');
  //console.log(getOneProduct);

  const productsByCategory = await Products.find({
    categories: { _id: categoreyId }
  })
    .populate('categories', 'name')
    .limit(3);
  setTimeout(async function() {
    await Products.updateOne(
      // find record with id name
      { _id: id },
      // increment it's property called "hasViewd" by 1
      { $inc: { hasViewd: 1 } }
    );
  }, 1200000);

  // SEND RESPONSE
  res.status(200).render('pages/singleSupplier', {
    product: getOneProduct,
    relatedProducts: productsByCategory,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.carBeautifing = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13ea' }
  })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find({
        categories: { $eq: '60e21f9a5e082a12c8dc13ea' }
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });
  console.log(products);

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('pages/carBeautifing', {
    carBeautifings: products,
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
});

exports.suppliers = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13eb' }
  })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find({
        categories: { $eq: '60e21f9a5e082a12c8dc13eb' }
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('pages/suppliers', {
    suppliers: products,
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
});

exports.pictures = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Products.find({
    categories: { $eq: '60e21f9a5e082a12c8dc13ea' }
  })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Products.find({
        categories: { $eq: '60e21f9a5e082a12c8dc13ea' }
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });
  console.log(products);

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('pages/pictures', {
    pictures: products,
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
});

exports.vediosWithAdminDashboard = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Vedios.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Vedios.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });
  // console.log(products);

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('dashboard/vedios/index', {
    vedios: products,
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
});

exports.vedios = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const products = await Vedios.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Vedios.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ _id: -1 });
    });

  const i18n = res.setLocale(req.cookies.i18n);

  // SEND RESPONSE
  res.status(200).render('pages/vedios', {
    vedios: products,
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
});

exports.singleVideo = catchAsync(async (req, res, next) => {
  let id = req.query.id;
  const i18n = res.setLocale(req.cookies.i18n);

  const getOneProduct = await Vedios.find({
    _id: {
      $eq: id
    }
  });

  // SEND RESPONSE
  res.status(200).render('pages/singleVedio', {
    product: getOneProduct,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.addProductWithAdminDashboard = catchAsync(async (req, res, next) => {
  const categories = await Categories.find().populate('products'); //-_id
  const i18n = res.setLocale(req.cookies.i18n);
  // SEND RESPONSE
  res.status(200).render('dashboard/addProduct/index', {
    categories,
    messageSuccessAdd: req.flash('messageSuccessAdd'),
    errorMessage: '',
    i18n: res,
    selectedI18n: i18n
  });
});

exports.addProductVedioWithAdminDashboard = catchAsync(
  async (req, res, next) => {
    const vedios = await Vedios.find(); //-_id
    const i18n = res.setLocale(req.cookies.i18n);
    // SEND RESPONSE
    res.status(200).render('admin_dashboard/addProductVedio', {
      vedios,
      errMessageVideoExist: req.flash('errMessageVideoExist'),
      messageSuccessAdd: req.flash('messageSuccessAdd'),
      i18n: res,
      selectedI18n: i18n
    });
  }
);

exports.updateProductWithAdminDashboard = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  const i18n = res.setLocale(req.cookies.i18n);
  const categories = await Categories.find().populate('products'); //-_id

  const getOneProduct = await Products.find({
    _id: {
      $eq: id
    }
  }).populate('categories', 'name');

  //console.log(getOneProduct);

  // SEND RESPONSE
  res.status(200).render('dashboard/editProduct/index', {
    product: getOneProduct,
    categories,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.updateProductVedioWithAdminDashboard = catchAsync(
  async (req, res, next) => {
    let id = req.params.id;
    const i18n = res.setLocale(req.cookies.i18n);

    const getOneProduct = await Vedios.find({
      _id: {
        $eq: id
      }
    });

    //console.log(getOneProduct);

    // SEND RESPONSE
    res.status(200).render('admin_dashboard/editProductVedio', {
      product: getOneProduct,
      errorMessage: '',
      i18n: res,
      selectedI18n: i18n
    });
  }
);

exports.updateBannerImage = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  const banners = await Banners.find({})
    .sort({ _id: -1 })
    .limit(3);

  // SEND RESPONSE
  res.status(200).render('dashboard/imageBannerUpdate/index', {
    banners: banners,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.imageBannerUpdateDown = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  const banners = await BannerBottom.find({})
    .sort({ _id: -1 })
    .limit(3);

  // SEND RESPONSE
  res.status(200).render('dashboard/imageBannerUpdateDown/index', {
    banners: banners,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.updateBannerImageWithAdminDashboard = catchAsync(
  async (req, res, next) => {
    let id = req.params.id;
    const i18n = res.setLocale(req.cookies.i18n);

    const getOneProduct = await Banners.find({
      _id: {
        $eq: id
      }
    });

    // SEND RESPONSE
    res.status(200).render('admin_dashboard/editBannerImage', {
      product: getOneProduct,
      i18n: res,
      selectedI18n: i18n
    });
  }
);

exports.updateBannerImageBottomWithAdminDashboard = catchAsync(
  async (req, res, next) => {
    let id = req.params.id;
    const i18n = res.setLocale(req.cookies.i18n);

    const getOneProduct = await BannerBottom.find({
      _id: {
        $eq: id
      }
    });

    // SEND RESPONSE
    res.status(200).render('admin_dashboard/editBannerImageBottom', {
      product: getOneProduct,
      i18n: res,
      selectedI18n: i18n
    });
  }
);

exports.search = catchAsync(async (req, res, next) => {
  const regex = new RegExp(`${req.query.dsearch}`, 'gi');
  const searchFor = req.query.dsearch;
  const i18n = res.setLocale(req.cookies.i18n);

  const findRes = await Products.find({
    $or: [
      {
        productName: { $regex: regex }
      },
      {
        productNameEnglish: { $regex: regex }
      },
      {
        productNameArabic: { $regex: regex }
      }
    ]
  });
  if (!findRes.length > 0) {
    console.log(findRes);
  }

  res.status(200).render('pages/searchResult', {
    title: 'all',
    allProducts: findRes,
    searchFor: searchFor,
    i18n: res,
    selectedI18n: i18n
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  res.render('pages/contact', {
    i18n: res,
    selectedI18n: i18n,
    message: ''
  });
});

exports.error500 = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  res.status(500).render('pages/500', {
    i18n: res,
    selectedI18n: i18n
  });
});

exports.error404 = catchAsync(async (req, res, next) => {
  const i18n = res.setLocale(req.cookies.i18n);
  res.status(404).render('pages/404', {
    i18n: res,
    selectedI18n: i18n
  });
});

console.log('hello');

// to change your remote to other existing remote using this steps
// git remote -v
// git remote set-url origin https://github.com/mohamednazm-web/tulibcinama.git
// git push -f origin master

// git add app.js
// git commit -m "changes"
// git add -A
// git push origin master
// git pull https://github.com/mohamednazm-web/hershcompany.git master
