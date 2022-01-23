const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
//const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
var session = require('express-session');
const flash = require('connect-flash');

const app = express();
const moment = require('moment');
const fs = require('fs');
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, 'images/product');
    } else if (file.fieldname === 'imageBannerBottom') {
      cb(null, 'images/bannerBottom');
    } else if (file.fieldname === 'sliderImage') {
      cb(null, 'images/slider');
    } else if (file.fieldname === 'imageBanner') {
      cb(null, 'images/banner');
    } else if (file.fieldname === 'vedioImage') {
      cb(null, 'images/vedioImage');
    } else {
      cb(null, 'images/subImage');
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(
        null,
        `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`
      );
    } else if (file.fieldname === 'imageBannerBottom') {
      cb(
        null,
        `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`
      );
    } else if (file.fieldname === 'sliderImage') {
      cb(
        null,
        `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`
      );
    } else if (file.fieldname === 'imageBanner') {
      cb(
        null,
        `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`
      );
    } else if (file.fieldname === 'vedioImage') {
      cb(
        null,
        `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`
      );
    } else {
      cb(
        null,
        `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`
      );
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    path.extension(file.originalname === '.zip')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const AppError = require('./utils/appError');
const viewRouter = require('./routes/viewRoutes');
const productRouter = require('./routes/productRoutes');
const categoreyRouter = require('./routes/categorieRoutes');
const adminDashboardRouter = require('./routes/adminDashboardRoutes');
const authRouter = require('./routes/authRoutes');
const ticketsRouter = require('./routes/ticketsRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage }).fields([
    {
      name: 'image',
      maxCount: 1
    },
    {
      name: 'imageBanner',
      maxCount: 1
    },
    {
      name: 'imageBannerBottom',
      maxCount: 1
    },
    {
      name: 'sliderImage',
      maxCount: 1
    },
    {
      name: 'vedioImage',
      maxCount: 1
    },
    {
      name: 'subImage1',
      maxCount: 1
    },
    {
      name: 'subImage2',
      maxCount: 1
    },
    {
      name: 'subImage3',
      maxCount: 1
    },
    {
      name: 'subImage4',
      maxCount: 1
    },
    {
      name: 'subImage5',
      maxCount: 1
    },
    {
      name: 'subImage6',
      maxCount: 1
    },
    {
      name: 'subImage7',
      maxCount: 1
    },
    {
      name: 'subImage8',
      maxCount: 1
    },
    {
      name: 'subImage9',
      maxCount: 1
    },
    {
      name: 'subImage10',
      maxCount: 1
    },
    {
      name: 'subImage11',
      maxCount: 1
    },
    {
      name: 'subImage12',
      maxCount: 1
    },
    {
      name: 'subImage13',
      maxCount: 1
    },
    {
      name: 'subImage14',
      maxCount: 1
    },
    {
      name: 'subImage15',
      maxCount: 1
    },
    {
      name: 'subImage16',
      maxCount: 1
    },
    {
      name: 'subImage17',
      maxCount: 1
    },
    {
      name: 'subImage18',
      maxCount: 1
    },
    {
      name: 'subImage19',
      maxCount: 1
    },
    {
      name: 'subImage20',
      maxCount: 1
    }
  ])
);

// reference for image uploading....

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.enable('trust proxy');

app.set('view engine', 'ejs');

///////////////////////////// translation ///////////////////////////////

var i18n = require('i18n');

i18n.configure({
  //define how many languages we would support in our application
  locales: ['ku', 'en', 'ar'],

  //define the path to language json files, default is /locales
  directory: __dirname + '/locales',

  //define the default language
  defaultLocale: 'ku',

  // define a custom cookie name to parse locale settings from
  cookie: 'i18n'
});

app.use(cookieParser('i18n_demo'));
app.use(
  session({
    secret: 'i18n_demo',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});
//init i18n after cookie-parser
app.use(i18n.init);

app.get('/ku', function(req, res) {
  res.cookie('i18n', 'ku');
  res.redirect('back');
});

app.get('/en', function(req, res) {
  res.cookie('i18n', 'en');
  res.redirect('back');
});

app.get('/ar', function(req, res) {
  res.cookie('i18n', 'ar');
  res.redirect('back');
});
//////////////////////////////////////////////////END TRANSLATION/////////////////////////////////////////////
// 1) Global Middleware
// Implement CORS
app.use(cors());

app.options('*', cors());
//app.options('/api/v1/tours/:id', cors());

//app.use(helmet());

// Development body
if (process.env.NODE_ENV === 'development') {
  // its availabel in every single file becasue already have in process.
  app.use(morgan('dev')); // requst send kaw tamashay consle bka
}

// limit request from same API
const limiter = rateLimit({
  // 100 request datwanre bnerdre la maway 1 houri
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); // "email": {"$gt": ""}

app.use(xss()); // html form attacks

app.use(compression());

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '30000kb'
  })
); // its need when you use post api
app.use(
  express.urlencoded({
    extended: true,
    limit: '30000kb'
  })
);

app.get('/login', async (req, res) => {
  res.render('dashboard/auth/login', {
    emailNotFound: req.flash('emailNotFound'),
    joiError: req.flash('joiError'),
    invalidPassword: req.flash('invalidPassword')
  });
});
//app.use(cookieParser());

// Test middleware
// app.use((req, res, next) => {
//   next();
// });

app.use(function(req, res, next) {
  var locale = 'ku';
  req.setLocale(locale);
  res.locals.language = locale;
  next();
});

app.use((req, res, next) => {
  req.requsetTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.get('/services', function(req, res) {
  const i18n = res.setLocale(req.cookies.i18n);
  res.render('pages/services', {
    i18n: res,
    selectedI18n: i18n
  });
});

app.get('/about', function(req, res) {
  const i18n = res.setLocale(req.cookies.i18n);
  res.render('pages/about', {
    i18n: res,
    selectedI18n: i18n
  });
});

app.use('/', viewRouter);
app.use('/admin_dashboard', adminDashboardRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoreyRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ticket', ticketsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

// START THE SERVER

module.exports = app;
