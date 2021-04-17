const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const User = require("./models/userinfo")
require("./db/conn");
const  port =  process.env.PORT || 3000;

// Setting the path

const staticpath  = path.join(__dirname, "../public");
const templatespath  = path.join(__dirname, "../templates/views");
const partialspath  = path.join(__dirname, "../templates/partials");

// console.log(path.join(__dirname, '../public/index.html'));

console.log(staticpath);
// middleware
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));


//routing

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jquery', express.static(path.join(__dirname, "../node_modules/jquery/dist/")));
app.set("view engine", "hbs");
app.set("views", templatespath);
hbs.registerPartials(partialspath); 



app.get("/",(req,res)=> {
    
res.render("index");
})

app.post("/contact", async(req,res) => {
try{
    // res.send(req.body);
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