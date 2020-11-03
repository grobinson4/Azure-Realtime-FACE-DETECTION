// load our app server 
const express = require('express')
const app = express()
const morgan = require('morgan')
// const mysql = require('mysql')
// const mysql_config = require('./config/mysql-config.js');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const path = require('path');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'stylesheet')))

// app.use(session({
//     secret: '&*^fl75wfefaljkl*32jlkjkl*ad',
//     resave: true,
//     saveUninitialized: true,
//  }))
 

 // Route Files
// const authRoutes = require('./routes/auth.js');
//  let events = require('./routes/events.js');
 let camera = require('./routes/camera.js');
 app.use(camera)
 //app.use(users)

//localhost:8080
app.listen(8080, () => {
    console.log("Server is up and listening on 8080...")
})