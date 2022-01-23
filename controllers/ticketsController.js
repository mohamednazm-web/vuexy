const Ticket = require('./../models/ticktesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const nodemailer = require('nodemailer');

// Get Recent Products for shop
// exports.getRecentProducts = catchAsync(async (req, res, next) => {
//   const products = await Product.find()
//     .populate('categories')
//     .sort({ _id: -1 })
//     .limit(3); //-_id

//   //console.log(products);

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: products.length,
//     data: {
//       recentProducts: products
//     }
//   });
// });

exports.createTicket = catchAsync(async (req, res, next) => {
  const flyingName = req.body.country;
  const flyingType = req.body.flyingType;

  const newTicket = await Ticket.create(req.body);

  var totalPrice = 0;

  if (flyingName === 'Manchester to Erbil' && flyingType == 0) {
    totalPrice += 395;
    console.log(totalPrice);
  }
  console.log(newTicket);
  if (!newTicket) {
    return next(new AppError('No document found with that ID', 404));
  } else {
    req.flash('successMessageTicket', 'your ticket submited successfuly');
    req.flash('totalPriceMessage', totalPrice);
    res.redirect('back');
  }
  // res.status(201).json({
  //   // 201 stands for to create new tour
  //   status: 'success',
  //   data: {
  //     data: newTicket
  //   }
  // });
});
