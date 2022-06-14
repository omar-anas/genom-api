const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { users } = require("../database");
const { executeQuery } = require('../db/execute');
let refreshTokenExpiration = "30d"
let accessTokenExpiration = "15d"

class userController {


  static test = async (req, res) => {

    const result = await executeQuery("select GET_SECURITY_MATRIX ('MYOUSRI')from dual")
    //  console.log(result.rows[0][0].substring(1, result.rows[0][0].length - 1))
    // console.log(result.rows[0][0])

    let jsonData = result.rows ? JSON.parse(result.rows[0][0]) : null
    res.status(200).send({apiStatus:true, data:jsonData, message:"success"})
    console.log(jsonData);
  }




  static SignUp = async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Validate if user already exists
    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      // 422 Unprocessable Entity: server understands the content type of the request entity
      // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
      return res.status(200).json({
        errors: [
          {
            email: user.email,
            msg: "The user already exists",
          },
        ],
      });
    }

    // Hash password before saving to database
    // const salt = await bcrypt.genSalt(10);
    const salt = process.env.SALT
    console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password:", hashedPassword);

    // Save email and password to database/array
    users.push({
      email,
      password: hashedPassword,
    });

    // Do not include sensitive information in JWT
    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: accessTokenExpiration,
      }
    );

    const refreshToken = await JWT.sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: refreshTokenExpiration,
      }
    );

    res.json({
      accessToken,
      refreshToken,
    });
  }




  static getAllUsers = (req, res) => {
    res.json(users);
  }



  static refreshTokens = [];
  
  static logIn = async (req, res) => {
    let refreshTokens = []; //this line should be deleted
    const { email, hashedPassword } = req.body;
    //Look for user email in Oracle real the database Start
    let user
    let isMatch
    let user_security_matrix
    await executeQuery(`select LOGIN('${email}','${hashedPassword}') from dual`).then((result) => {
      console.log("req.bodyc ", req.body)
      isMatch = result.rows ? result.rows[0][0] > 0 : false
      if (isMatch) {
        user = {
          email,
          hashedPassword
        }


      }

      return result.rows[0][0] > 0
    })

    await executeQuery(`select GET_SECURITY_MATRIX ('${email}')from dual`).then((res) => {
      //  console.log(result.rows[0][0].substring(1, result.rows[0][0].length - 1))
      // console.log(result.rows[0][0])
      // console.log("res" , res)
      // console.log("email" , email)
      res ? user_security_matrix = JSON.parse(res.rows[0][0]) : null
      console.log(user_security_matrix[0]['PRIVILEGE_NAME'])
      // console.log(JSON.stringify(result.rows[0][0]) )
      // console.log(result.rows[0][0])
      // console.log(result.rows[0][0][0])
      return user_security_matrix
    });


    //Look for user email in Oracle real the database End

    // Look for user email in the database
    /*
     user = users.find((user) => {
      return user.email === email;
    });
    */
    //New Part Start Connect 

    //New Part End Connect 
    console.log("user ", user)
    // If user not found, send error message
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }

    // Compare hased password with user password to see if they are valid
    // let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        errors: [
          {
            msg: "Email or password is invalid",
          },
        ],
      });
    }

    // Send JWT access token
    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: accessTokenExpiration,
      }
    );

    // Refresh token
    const refreshToken = await JWT.sign(
      { email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: refreshTokenExpiration,
      }
    );

    // Set refersh token in refreshTokens array
    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      user_security_matrix,
    });
  }
















  static refreshTokenFunc = async (req, res) => {
    // const refreshToken = req.header("x-auth-token");
    const refreshToken = req.body.refreshToken;

    console.log("refreshToken", refreshToken);

    // If token is not provided, send error message
    if (!refreshToken) {
      res.status(401).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }

    try {
      // If token does not exist, send error message
      if (!refreshTokens.includes(refreshToken)) {
        res.status(403).json({
          errors: [
            {
              msg: "Invalid refresh token",
            },
          ],
        });
      }

      try {
        const user = await JWT.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
        const { email } = user;
        const accessToken = await JWT.sign(
          { email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: accessTokenExpiration }
        );
        res.json({ accessToken });
      } catch (error) {
        res.status(403).json({
          errors: [
            {
              msg: "Invalid token",
            },
          ],
        });
      }
    } catch (error) {
      console.log("Token Error")
    }
  }




  static logOut = (req, res) => {
    const refreshToken = req.header("x-auth-token");

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
  }
}

module.exports = userController;