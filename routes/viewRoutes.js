const express = require('express');
const viewsController = require('../controllers/viewsController');
const verify = require('./verifyToken');

const router = express.Router();

router.get('/', viewsController.products);
router.get('/admin_dashboard', verify, viewsController.adminDashboard);
router.get(
  '/admin_dashboard/products',
  verify,
  viewsController.productsOfdashboard
);
router.get(
  '/admin_dashboard/oneWay',
  verify,
  viewsController.oneWayOfDashboard
);
router.get(
  '/admin_dashboard/return',
  verify,
  viewsController.returnTicketOfDashboard
);
router.get(
  '/admin_dashboard/add-product',
  verify,
  viewsController.addProductWithAdminDashboard
);
router.get(
  '/admin_dashboard/add-product-vedio',
  verify,
  viewsController.addProductVedioWithAdminDashboard
);
router.get(
  '/admin_dashboard/update-product/:id',
  verify,
  viewsController.updateProductWithAdminDashboard
);
router.get(
  '/admin_dashboard/update-product-vedio/:id',
  verify,
  viewsController.updateProductVedioWithAdminDashboard
);
router.get(
  '/admin_dashboard/updateBannerImage',
  verify,
  viewsController.updateBannerImage
);
router.get(
  '/admin_dashboard/imageBannerUpdateDown',
  verify,
  viewsController.imageBannerUpdateDown
);
router.get(
  '/admin_dashboard/updateBannerImage/:id',
  verify,
  viewsController.updateBannerImageWithAdminDashboard
);
router.get(
  '/admin_dashboard/updateBannerImageBottom/:id',
  verify,
  viewsController.updateBannerImageBottomWithAdminDashboard
);
router.get(
  '/admin_dashboard/vedios',
  verify,
  viewsController.vediosWithAdminDashboard
);
router.get('/search', viewsController.search);
router.get('/pictures', viewsController.pictures);
router.get('/singleCarBeautifing', viewsController.singleCarBeautifing);
router.get('/carBeautifing', viewsController.carBeautifing);
router.get('/singleCarSales', viewsController.singleCarSales);
router.get('/carSales', viewsController.carSales);
router.get('/singleSupplier', viewsController.singleSupplier);
router.get('/allSingleProducts', viewsController.allSingleProducts);
router.get('/ourSuppliers', viewsController.suppliers);
router.get('/vedios', viewsController.vedios);
router.get('/singleVideo', viewsController.singleVideo);
router.get('/contact', viewsController.getContact);
router.get('/500', viewsController.error500);
router.get('/404', viewsController.error404);

module.exports = router;
