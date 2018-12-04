// Use dotenv to read .env vars into Node
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// require db//
const db = require('./models/index');

//====================================================
///////MIDDLE-WARE////////////////////////////////////
//====================================================

//Require use of Express CORS middle ware//
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  // Express Body Parser Middleware
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());


//====================================================
///////REQUIRE API////////////////////////////////////
//====================================================

//Users//
const userRouter = require('./config/api/users/routes');

//Sched Tour//
const tourRouter = require('./config/api/tours/routes');

//Plan type//
const planRouter = require('./config/api/plans/routes');

//Plan type//
const avatarRouter = require('./config/api/avatar/routes');

//====================================================
///////API-ENDPOINTS-ROUTES///////////////////////////
//====================================================
app.use('/api/users', userRouter);
app.use('/api/tours', tourRouter);
app.use('/api/plans', planRouter);
// app.use('/api/avatar', avatarRouter);

// GET routes for user upload--->
app.get('/uploads/:imagename', (req, res) => {
    res.sendFile('public/uploads/' + req.params.imagename, { root: __dirname });
})

app.get('/api/avatar', (req, res) => {
    res.sendFile('public/uploads/' + req.params.imagename, { root: __dirname });
})

// app.get('api/avatar/:user_id')
app.get('/public', (req, res) => {
    console.log('working');
});


//====================================================
/////// SERVE-STATIC-FILES   /////////////////////////
//====================================================

app.use(express.static(__dirname + '/api/users/'));
app.use(express.static(__dirname + '/public/'));
// const publicPath = path.join(__dirname, '../server/public');
// app.use(express.static(publicPath));
app.use('/public/images', express.static('Images'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if(req.method === 'OPTIONS') {
        res.end();
    }
    else {
        next();
    }
});

//heroku
// app.use(express.static(path.join(__dirname, "client", "build")))


//====================================================
/////// Stripe CORS stuff ////////////////
//====================================================

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
    origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
    ? callback(null, true)
    : callback(new Error('Not allowed by CORS mate!'))
};

const configureServer = app => {
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
};

const configureRoutes = require('./routes');

configureServer(app);
configureRoutes(app);


//====================================================
///////MULTER 2///////////////////////////////////
//====================================================

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    console.log(file)
    },
  });
  
  const upload = multer({ 
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  })

    // Check File Type
  function checkFileType(file, cb){
    //Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
  
//   express route where we receive files from the client
//   passing multer middleware
// app.post('/api/avatar/:id/upload', upload.single('file'), (req, res) => {
app.post('/api/avatar/:avatar_id', upload.single('file'), (req, res) => {
   const file = req.file; // file passed from client
   const meta = req.body; // all other values passed from the client, like name, etc..
   const id = req.params.avatar_id;
//    find the avatar imgUrl and update the image
    let update = {imgUrl: `/uploads/${req.file.filename}`};
    db.Avatar.findByIdAndUpdate(id, update, {new: true}, (err, updated) => {
        
        res.json(updated);
    });
    

   

  });


//====================================================
///////SANITY CHECK///////////////////////////////////
//====================================================
app.get('/', (req, res) => {
    res.send('<h1>&#128372; Moonwalking Micheal Jackson style...</h1>');
});

//heroku
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

//====================================================
///////START SERVER///////////////////////////////////
//====================================================
app.listen(port, () => console.log(`Server moonwalking like Mike J. on port ${port}`));

