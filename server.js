const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var cors = require('cors');
var knex = require('knex');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image")


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'varunpuri',
      password : '',
      database : 'smart-brain'
    }
});


const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send('success');
})

//Sign In Page
app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt)})


// Registration Page
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

// User Profile
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

// Updating Entries

app.put('/image', (req,res) => {image.handleImage(req,res,db)})


app.get("/", (req, res) => {
    res.send(database.users);
  });


const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
