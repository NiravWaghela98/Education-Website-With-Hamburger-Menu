// 1st step
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")  

const port = 4000;
const fs = require("fs");
// for saving the database in mongodb
const mongoose = require('mongoose');

app.use(bodyParser.json())
main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false)
   mongoose.connect('mongodb://127.0.0.1:27017/signup');
}

//Define mongoose schema
const signupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
  });
  const Signup = mongoose.model('signup', signupSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    text: String
  });
  const Contact = mongoose.model('contact', contactSchema);


  // 2nd step static folder banana EXPRESS SPECIFIC STUFF EXPRESS SE RELETED ISME KARENGE SAB 
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// 3rd step PUG SPECIFIC STUFF
app.set("view engine", "pug");  // set the template engine as pug
app.set("views", path.join(__dirname, "views")) // Set the views directory

// 4th step ENDPOINTS

app.get("/", (req, res) => {
    res.render("signup.pug");
    
  });
  
   

  app.get("/home", (req, res) => {
    res.render("home");
  });
  app.get("/contactus", (req, res) => {
    res.render("contactus");
  });


// post req part of mongoose to save database
app.post("/", async(req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({
      error: 'Please enter all required fields (email, username, password)'
    });
  }

  const myData = new Signup({ email, username, password });
  try {
    await myData.save();
    res.redirect('/home');
  } catch (error) {
    res.status(400).send("item was not saved to the database");
  }
});



app.post('/contactus', (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    text: req.body.text
  });

  contact.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Form submitted successfully!');
    }
  });
});





app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`)

})