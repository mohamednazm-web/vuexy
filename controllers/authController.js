const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  //const validation = Joi.validate(req.body, schema);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  // create and assign a token.
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id, token: token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email);
  const { error } = loginValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    req.flash('joiError', error.details[0].message);
    return res.redirect('back');
  }
  //Checking if email exists
  const user = await User.findOne({ email: email });
  //if (!user) return res.status(400).send('Email is not found');
  if (!user) {
    req.flash('emailNotFound', 'ئەم ئیمەیڵە نەدۆزرایەوە');
    return res.redirect('back');
  }
  // PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(password, user.password);
  //if (!validPassword) return res.status(400).send('Invalid password');
  if (!validPassword) {
    req.flash('invalidPassword', 'تێپەڕووشەکەت هەڵەیە');
    return res.redirect('back');
  }
  // create and assign a token.
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  //res.header("auth-token", token).send(token);
  res.cookie('jwt', token).send({ username: user.name, token });
  // res.cookie('jwt', token).redirect('/admin_dashboard');
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', { expires: Date.now() }).redirect('/');
});
