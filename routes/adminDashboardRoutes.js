const express = require('express');
const adminDashboardController = require('../controllers/adminDashboardController');

const router = express.Router();

router
  .route('/')
  .post(adminDashboardController.createProductWithAdminDashboard);
router
  .route('/createVedioProduct')
  .post(adminDashboardController.createVedioProduct);
// router.route('/delete/:id').get(adminDashboardController.deleteProductWithAdminDashboard);
router
  .route('/delete-product')
  .post(adminDashboardController.deleteProductWithAdminDashboard);
router
  .route('/update/:id')
  .post(adminDashboardController.updateProductWithAdminDashboard);
router
  .route('/update-vedio/:id')
  .post(adminDashboardController.updateProductVedioWithAdminDashboard);
router
  .route('/delete-vedio')
  .post(adminDashboardController.deleteVideoWithAdminDashboard);
router
  .route('/delete-sub-image1/:id')
  .get(adminDashboardController.deleteVideoWithAdminDashboard);
router
  .route('/updateBannerImage/:id')
  .post(adminDashboardController.updateBannerImageWithAdminDashboard);
router
  .route('/updateBannerImageBottom/:id')
  .post(adminDashboardController.updateBannerImageBottomWithAdminDashboard);
router.route('/getContact').post(adminDashboardController.sendContact);
router.route('/contacts').get(adminDashboardController.showContacts);

module.exports = router;
