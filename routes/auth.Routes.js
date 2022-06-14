const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { users } = require("../database");
const {executeQuery}  = require('../db/execute');
let refreshTokenExpiration = "30d"
let accessTokenExpiration = "15d"
const userController = require('../controllers/userController')

//Use db Start 
   
// executeQuery(`select * from SYS_USERS`).then( (result)=>{
  
//   console.log(result)
//   })

  
  //  console.log(jsonData)
    // console.log(JSON.stringify(result.rows[0][0]) )
    // console.log(result.rows[0][0])
    // console.log(result.rows[0][0][0])

   
// use db End 


require("dotenv").config();

// Sign up
router.post(
  "/signup",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  userController.SignUp
);

// Error status code
// 401 Unauthorized: it’s for authentication, not authorization. Server says "you're not authenticated".
// 403 Forbidden: it's for authorization. Server says "I know who you are,
//                but you just don’t have permission to access this resource".

///////////////////////////

router.get("/", userController.test);
// Get all users
router.get("/users", userController.getAllUsers);

// Log in
router.post("/login", userController.logIn);


// Create new access token from refresh token
router.post("/token",userController.refreshTokenFunc);

// Deauthenticate - log out
// Delete refresh token
router.delete("/logout", userController.logOut);

module.exports = router;
