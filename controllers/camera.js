//require('dotenv').config()
const express = require('express')
const app = express()
//const User = require('../models/user');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body><p id="main">My First JSDOM!</p></body>`);
// const mysql_config = require('../config/mysql-config.js');
// var bcrypt = require('bcryptjs');
// var MailComposer = require('nodemailer/lib/mail-composer');
// const moment = require('moment');
// const sendMail = require('@sendgrid/mail')
// sendMail.setApiKey(process.env.SENDGRID_API_KEY)
// const jwt = require('jsonwebtoken');
// const { sequelize } = require('../models/user');
const router = express.Router();
const video = dom.window.document.getElementById('video')


let result = dom.window.document.getElementById("result");
//const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

router.use(bodyParser.json());

exports.webCam = (req, res) => {
    startVideo()
    res.render('camera');
};

function startVideo() {
    navigator.getUserMedia(
        {
            video: {
                facingMode: "user" 
            }
        },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    // faceapi.matchDimensions(canvas, displaySize)
    // setInterval(async () => {
    //     const detections = await faceapi.detectAllFaces(video, 
    //         new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
    //         const resizeDetections = faceapi.resizeResults(detections, displaySize)
    //         canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
    //         faceapi.draw.drawDetections(canvas, resizeDetections)
    //         faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
    //         faceapi.draw.drawFaceExpressions(canvas, resizeDetections)
    //         resizeDetections.forEach( detection => {
    //             const box = detection.detection.box
    //             const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
    //             drawBox.draw(canvas)
    //           })
    // }, 100)
})


function authenticateToken(req, res, next) {

    const token = req.cookies.auth;
  
    if(token == null) return res.sendStatus(401)
    //console.log(process.env.ACCESS_TOKEN_SECRET)
    jwt.verify(token, "" + process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// exports.register = (req, res) => {
//     var {first_name, last_name, user_name, email, phone, password} = req.body;
   

//     var token = jwt.sign({first_name, last_name, user_name, email, phone, password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'20m'})

//     const message = {
//         to: email,
//         from: 'gdrobinson92@comcast.net',
//         subject: 'test mail',
//         headers: {"Authorization": "Bearer", token},
//         html:`<html><body><h2>Please click on given link to activate your account</h2><a target="_blank" href="${process.env.CLIENT_URL}/authentication/activate/${token}">Activate Account</a></body></html>`
//     };

//     sendMail.send(message, function(err, json){
//         if(err) { return console.error(err); }
//         console.log(json);
//     });
// };

// exports.activateAccount = (req, res) => {
//     const accessToken = req.params.token
//     var user = sequelize.model('user_account', User)
//     console.log(accessToken)
//     if(accessToken) {
//        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedToken){
//            if(err){
//                return res.status(400).json({error: 'Incorrect or Expired link.'})
//            }
//            var {first_name, last_name, user_name, email, phone, password} = decodedToken;
//            const queryString = "INSERT INTO user_account (first_name, last_name, user_name, email, phone, password, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"

//            let errors = validationResult(req)
           
//            // 1. Check to see if user is already registered
//         //    user.findOne({where: {email: email}}).exec((err, user) => {
//         //        if(user) {
//         //            return res.status(400).json({error: "User with this email already exists."});
//         //        }
//         //    })
       
//             // 2. Check for an more errors
//             if(!errors.isEmpty()){
//                res.render('register',{
//                    errors:errors
//                })
//            }

//                // 3. Hash password and add new user to the database
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//             if(err){
//                 console.log(err);
//             }
//             password = hash;
//             mysql_config.connection.query(queryString, [first_name,last_name, user_name, email, phone, password, moment().format('YYYY-MM-DD HH:mm:ss')], (err, results, fields) => {
//               if(err){
//                   console.log("Error activating Account:" + err)
//                   res.sendStatus(500)
//                   res.end()
//                   return
//                 }
//                res.redirect('/login')
//              })
//         });

//     })

//        })
//     } else{
//         return res.json({error: "Something went wrong"})
//     }
// }

// let refreshTokens = []

// exports.newToken = (req, res) => {
//     const refreshToken = req.cookies.auth;
//     if (refreshToken == null) return res.sendStatus(401)
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({name: user.name})
//         res.cookie('auth',accessToken)
//     })
// }

// exports.loginForm = (req, res) => {
//     res.render('login');
// };

// exports.login = (req, res) => {
   
//         const username = req.body.username
//         const user = {name: username}
//         const password = req.body.password
//         const accessToken = generateAccessToken(user);
//         const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//         const queryString = "SELECT * FROM user_account WHERE user_name='" + username + "'" 
//         mysql_config.connection.query(queryString, [username, password], (err, results, fields) => {
//             if(err){
//                 console.log("cannot find user:" + err)
//                 res.sendStatus(500)
//                 res.end()
//                 return
//               }
//               try{
//                 if(bcrypt.compare(password, User.password)){
//                     res.cookie('auth',accessToken, refreshToken);
//                     // res.send({ success: true,
//                     //     message: 'Authentication successful',
//                     //     accessToken: accessToken})
//                         console.log(accessToken + " " + "refresh" + refreshToken)
//                     res.redirect('/enter_code')
                    
//                 }else {
//                     res.send('Not Allowed')
//                 }
//             } catch {
//                 res.status(500).send()
//             }
             
//            })
// }

// function generateAccessToken(user) {
//     return jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
// }

// exports.enter_code = (req, res) => {
//     res.render('enter_code');
// };

// exports.phoneAuth = (req, res) => {
//     client
//         .verify
//         .services(process.env.TWILIO_SERVICE_ID)
//         .verifications
//         .create({
//             to: '+' + req.query.phonenumber,
//             channel: 'sms'
//         })
//         .then((data) => {
//             req.app.set('phonenumber', req.query.phonenumber)
//             res.redirect('/verify_code').send(data)
//         })
// }

// exports.verify_code = (req, res) => {
//     res.render('verify_code');
// };


// exports.verifyPhone = (req, res) => {
//     client
//         .verify
//         .services(process.env.TWILIO_SERVICE_ID)
//         .verificationChecks
//         .create({
//             to: '+' + req.app.get('phonenumber'),
//             code: req.query.code
//         })
//         .then((data) => {
//             res.redirect("/").send(data)
//         })
// }


// exports.logout = (req, res) => {
//     refreshTokens = refreshTokens.filter(token => token != req.cookie.auth)
// }


