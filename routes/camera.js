const express = require("express");
const router = express.Router();
//var cookieParser = require('cookie-parser')


const {webCam} = require("../controllers/camera.js");
//const { verify } = require("jsonwebtoken");

// Registration 
//router.get('/register', registrationForm);

// Verify Email to Activate account
//router.get('/login/authentication/activate/:token', activateAccount)


//router.post('/register', register);
//router.post('/email-activate', activateAccount);

 //Login 
 router.get('/camera', webCam);
//  router.get('/enter_code', enter_code);
//  router.get('/phone', phoneAuth);
//  router.get('/phone-verification', verifyPhone);
//  router.get('/verify_code', verify_code);
//  router.post('/token', newToken);
//  router.post('/login', login);
//  router.delete('/logout', logout)





module.exports = router;