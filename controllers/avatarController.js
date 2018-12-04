const db = require('../models');
const Avatar = db.Avatar;
// const multer = require('multer');
// const express = require('express');
// const app = express();

///////////////////////////////////////////////////
///////INDEX- get /api/avatars////////////////////////////

const index = (req, res) => {
    Avatar.find({})
        .populate('avatar')
        .exec((err, getAvatars) => {
            if (err) {
                console.log(err)
                return;
            }
            res.json(getAvatars);
        });
}

///////////////////////////////////////////////////
///////SHOW- get /api/avatars/:user_id///////////////////
const show = (req, res) => {
    let id = req.params.user_id;
    Avatar.find({user: id}, (err, getAvatar) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(getAvatar);
        });
    };


///////////////////////////////////////////////////
///////create, POST///////////////////
const create = (req, res) => {
    // upload(req, res, (err) => {
    //     if (err) throw err;
    //         console.log("req file :", req.file); 
    //         // create new profile image
    //         let newAvatar = new db.Avatar({
    //             imgUrl: '/uploads/' + req.file.filename,
    //         });
    //         newAvatar.save();
    //         res.json(newAvatar)
    //     })  
    }


/////////////////////////////////////////////////////////////////
///////// MULTER STUFF //////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// const create = (req, res) => {
// const storage = multer.diskStorage({
//     destination: '../public/uploads',
//     filename(req, file, cb) {
    //   cb(null, file.fieldname + '-' + Date().toLocaleString().slice(0,10) + path.extname(file.originalname));
//     cb(null, file.filename + path.extname(file.originalname));
//     console.log(file)
//     },
//   });
  
//   const upload = multer({ 
//     storage: storage,
//     limits:{fileSize: 1000000},
//     fileFilter: function(req, file, cb){
//       checkFileType(file, cb);
//     }
//   })

//     // Check File Type
//   function checkFileType(file, cb){
//     //Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     //Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     //Check mime
//     const mimetype = filetypes.test(file.mimetype);
  
//     if(mimetype && extname){
//       return cb(null,true);
//     } else {
//       cb('Error: Images Only!');
//     }
//   }
  
// //   express route where we receive files from the client
// //   passing multer middleware
// // app.post('/api/avatar/:id/upload', upload.single('file'), (req, res) => {
// app.post('/api/avatar/:id', upload.single('file'), (req, res) => {
//    const file = req.file; // file passed from client
//    const meta = req.body; // all other values passed from the client, like name, etc..
   
//    //find the avatar imgUrl and update the image
//    db.Avatar.findByIdAndUpdate();
//     let newImgUrl = new db.ProfileImage({
//         // imgUrl = newImgUrl
// });
//         newImage.save();
//         res.json(newImage)

//    console.log(file, 'success!')

//    res.end();
//   })
// }


module.exports = {
    index, show, create
}