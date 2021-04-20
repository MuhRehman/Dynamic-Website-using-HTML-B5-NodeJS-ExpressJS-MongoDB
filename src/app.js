const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const multer = require('multer');
const helpers = require('./helpers');
const path = require("path");
 const hbs = require("hbs");
 var router = express.Router(); 


const mongoose = require("mongoose");
const Image = require("./models/Image")
const User = require("./models/userinfo");
const { connect } = require("mongodb");
require("./db/conn");
const  port =  process.env.PORT || 3000;

// default options
app.use(fileUpload());
// Setting the path

const staticpath  = path.join(__dirname, "../public");
const templatespath  = path.join(__dirname, "../templates/views");
const partialspath  = path.join(__dirname, "../templates/partials");

// console.log(path.join(__dirname, '../public/index.html'));

console.log(staticpath);
// middleware
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.use(express.static(__dirname + '/public'));

// app.use(upload());
//routing

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jquery', express.static(path.join(__dirname, "../node_modules/jquery/dist/")));
app.set("view engine", "hbs");
app.set("views", templatespath);
hbs.registerPartials(partialspath); 





/////////////////////////----------storage-location-for-image
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//        const ext = path.extname(file.originalname);
//     //    const id  = uuid();

//        const filePath = `images/$(id)$(ext)`;
//        image.create({filePath})
//        .then(()=> {

//            cb(null, filePath);
//        });
//     }
// });

// var upload = multer({storage });

// //disguiness
// var multipleUpload = upload.fields([{ name: 'file1' }, { name: 'file2', maxCount: 3 }]);


// app.post('/upload', upload.array('myFile'), (req, res) => {
    
//     return res.json({ status: "Ok" });
//     // const file = req.file
//     // if (!file) {
//     //   const error = new Error('Please upload a file')
//     //   error.httpStatusCode = 400
//     //   return next(error)
//     // }
//     //   res.send(file)
    
//   });


/////////////////////////----------storage-location-for-image
/////////////////////////----------fileuploader-express.js-for-image----------


app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });


/////////////////////////----------fileuploader-express.js-for-image-----------

app.get("/admin",(req,res)=> {
    
res.sendFile(__dirname + '/index.html')
})


///----route

app.post("/uploading",(req,res)=> {
 
    if (req.files) {
      
        var file = req.files.pic
      var filename1 = file.name
    
   
      file.mv('./uploads/'+ filename1, function (err) {
          if(err) {
              res.send(err)
          } else {
       
             var insobj= {
                    email:req.body.email,
                    lname:req.body.lname,
                    phone:req.body.phone,
                    filename:filename1
             };
             User.deleteMany({}).then((result)=> {
              res.status(200).json(result)
            }).catch((err)=>{console.warn(err);})
             const userData = new User(insobj);
       
             userData.save();
           
            
              res.send("File Uploaded!");
              
          }
      })
    }
})

app.delete('/users',function(req,res) {

})




app.get("/",(req,res)=> {
    
  User.find({}, function (err,users) {
    if(err){
      console.log(err);
    }else {
      console.log(users);
      res.render("index", {  allDetails : users })
    }
  })

})

app.post("/contact", async(req,res) => {
try{
      
    const userData = new User(req.body);
   await userData.save();
  res.status(201).render("index");
} catch (error) {
res.status(500).send(error);
}
})



//server create

app.listen(port, () => {
    console.log(`Server is running at the port number.  ${port}`);
});