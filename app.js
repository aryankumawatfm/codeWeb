const express = require('express');
const { request } = require('http');
const path = require("path");
const Singup = require('./src/models/singup');
const app = express();
const jwt = require("jsonwebtoken");
require("ejs")
const cookieParser = require("cookie-parser")
require("./src/db/conn")()

// const Singup = require("./singup")
const port = process.env.PORT || 3000;

app.use(cookieParser())

const secret = "lasjdflakwjoiiq2eeurqr;3m4kth0242";

// const static_Path = path.join(__dirname, "../public")
const templates_Path = path.join(__dirname, "../templates/views")
const Partials_Path = path.join(__dirname, "../templates/partials")
app.use("/public", express.static("public"))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static(static_Path))
app.set("view engine", "ejs");

app.get('/',  (req, res) => {
  if(!req.cookies.token) {
    res.render("index")
  }
  else {
    res.redirect('/profile')
  }
});

app.get('/', (req, res) => {
  res.render("about")
});

app.get("/auth", isUnuathrized, (req, res)=> {
  res.render("login")
})


function isLoggedIn(req, res, next) {
  if(!req.cookies.token) {
    return res.redirect('/auth')
  }
  next()
}


app.get("/auth/logout", isLoggedIn, (req, res)=> {
    res.clearCookie("token", null) 
    res.redirect('/')
})

function isUnuathrized(req, res, next) {
  const token = req.cookies.token;
  if(token == null) {
    return next()
  }
  else {
    res.redirect('/')
  }
}
app.post('/auth/login', isUnuathrized ,async (req, res)=> {
  const {username, password} = req.body;
  if(!username || !password) {
    res.send("all fields are required");
  }

  const user = await Singup.findOne({username});
  console.log(user)
  if(!user._id) {
    return res.send("no user exist")
  }

  console.log(user.password, password)
  console.log(user)

  const compare = user.password == password
  if(!compare) {
    return res.send("unauthrized");
  }
  const token = jwt.sign({id: user._id}, secret);

  res.cookie("token", token,  { maxAge: 60 *1000*60*60*24 , httpOnly: true });

  res.redirect("/profile")

  console.log(req.body)
})

app.post("/auth/signup", async (req, res)=> {
  const {username, email, password} = req.body;
  if(!email || !password || !username){
    res.send("all fields are required");
  }



  const isUserExist = await Singup.find({username});
  if(isUserExist._id) {
    return res.send("User already exist");
  }
  const user = await Singup.create({email, password, username});
  const token = jwt.sign({id: user._id}, secret);
  
  res.cookie("token", token,  { maxAge: 900000, httpOnly: true });

  res.redirect("/profile")
})



app.get("/profile", isLoggedIn, (req, res)=> {
  res.render("profile")
})

app.listen(port, () => {
  console.log(`sever is running at prt no ${port}`);
});