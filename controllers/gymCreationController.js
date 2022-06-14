const router = require("express").Router();
const { publicPosts, privatePosts } = require("../database");
const authToken = require("../middleware/authenticateToken");
const userAuthorization = require("../middleware/userAuthorization");
const {executeQuery}  = require('../db/execute');


class gymCreationController {
    static getAllGyms = (req, res) => {
        let jsonData
         executeQuery(`select  GET_ALL_GYM() from dual `).then( (result)=>{
          //  console.log("sqlRes " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      }


    static getSpecificGym = (req, res) => {
        let jsonData
        let gymID = req.params.gymID
         executeQuery(`select  GET_SPECIFIC_GYM(${gymID}) from dual `).then( (result)=>{
          //  console.log("sqlRes " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      } 


      static getAllModules = (req, res) => {
        let jsonData
         executeQuery(`select  GET_ALL_MODULE() from dual `).then( (result)=>{
          // console.log("GET_ALL_MODULE 1 " ,result.rows[0][0] )
      
          //  console.log("GET_ALL_MODULE  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      }


      static getSubscribedModule = (req, res) => {
        let jsonData
        let gymID = req.params.gymID
         executeQuery(`select  GET_GYM_SUBSCRIBED_MODULE(${gymID}) from dual `).then( (result)=>{
          // console.log("GET_ALL_MODULE 1 " ,result.rows[0][0] )
          //  console.log("GET_ALL_MODULE  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      }


      static addGym = (req, res) => {
        let jsonData
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let NAME_EN_V  = req.body.NAME_EN_V;
        let NAME_AR_V  = req.body.NAME_AR_V;
        let OWNER_V  = req.body.OWNER_V;
        let MOBILE_V  = req.body.MOBILE_V;
        let EMAIL_V  = req.body.EMAIL_V;
        let SUB_START_DATE_V  = req.body.SUB_START_DATE_V;
        let SUB_END_DATE_V  = req.body.SUB_END_DATE_V;
        let NOTE_V  = req.body.NOTE_V;
        let DEAL_PRICE_V = req.body.DEAL_PRICE_V;
        let USR_ID_V = req.body.USR_ID_V;
        let USERS_QUOTA_V = req.body.USERS_QUOTA_V;
        let SUBSCRIBED_MODULE_V = req.body.SUBSCRIBED_MODULE_V;
          console.log("payload 1 " ,NAME_EN_V)
      
        //Get Payload End
         executeQuery(`select  ADD_GYM('${CREATED_BY_USERNAME}','${NAME_EN_V }','${NAME_AR_V }','${OWNER_V }','${MOBILE_V }','${EMAIL_V }','${SUB_START_DATE_V }','${SUB_END_DATE_V}','${NOTE_V}',${DEAL_PRICE_V},${USERS_QUOTA_V},'${SUBSCRIBED_MODULE_V}') from dual `).then( (result)=>{
          console.log("ADD_GYM RES " ,result )
      
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("ADD_GYM ERR " ,err )
      
          });

      }



      static editGym = (req, res) => {
        let jsonData
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let GYM_ID_V = req.body.GYM_ID_V;
        let NAME_EN_V  = req.body.NAME_EN_V;
        let NAME_AR_V  = req.body.NAME_AR_V;
        let OWNER_V  = req.body.OWNER_V;
        let MOBILE_V  = req.body.MOBILE_V;
        let EMAIL_V  = req.body.EMAIL_V;
        let SUB_START_DATE_V  = req.body.SUB_START_DATE_V;
        let SUB_END_DATE_V  = req.body.SUB_END_DATE_V;
        let NOTE_V  = req.body.NOTE_V;
        let DEAL_PRICE_V = req.body.DEAL_PRICE_V;
        let USERS_QUOTA_V = req.body.USERS_QUOTA_V;
        let SUBSCRIBED_MODULE_V = req.body.SUBSCRIBED_MODULE_V;
        let STATUS_V = req.body.STATUS_V;
          console.log("payload 1 " ,NAME_EN_V)
      
        //Get Payload End
         executeQuery(`select  EDIT_GYM('${CREATED_BY_USERNAME}',${GYM_ID_V },'${NAME_EN_V }','${NAME_AR_V }','${OWNER_V }','${MOBILE_V }','${EMAIL_V }','${SUB_START_DATE_V }','${SUB_END_DATE_V}','${NOTE_V}',${DEAL_PRICE_V},${USERS_QUOTA_V},'${SUBSCRIBED_MODULE_V}','${STATUS_V}') from dual `).then( (result)=>{
          console.log("EDIT_GYM RES " ,result )
      
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("ADD_EDIT_GYM ERR " ,err )
      
          });
      
      
      }



      static getGymBranch = (req, res) => {
        let jsonData
        let gymID = req.params.gymID
         executeQuery(`select GET_GYM_BRANCHES(${gymID}) from dual `).then( (result)=>{
          //  console.log("sqlRes " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      
      
      }


      static getGymSection = (req, res) => {
        let jsonData
        let gymID = req.params.gymID
         executeQuery(`select  GET_GYM_SECTIONS(${gymID}) from dual `).then( (result)=>{
          //  console.log("sqlRes " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      
      }


      static getGymOwner = (req, res) => {
        let jsonData
        let gymID = req.params.gymID
         executeQuery(`select  GET_GYM_USERS(${gymID}) from dual `).then( (result)=>{
          //  console.log("sqlRes " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          });
      }
      static addBranch=(req, res) => {
        let jsonData
      
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let NAME_EN_V  = req.body.NAME_EN_V;
        let NAME_AR_V  = req.body.NAME_AR_V;
        let GYM_ID_V  = req.body.GYM_ID_V;
        let MOBILE_V  = req.body.MOBILE_V;
        let EMAIL_V  = req.body.EMAIL_V;
        let BRCH_MGR_V  = req.body.BRCH_MGR_V;
        let ADDRESS_V  = req.body.ADDRESS_V;
        let CITY_V  = req.body.CITY_V;
        let FACEBOOK_URL_V = req.body.FACEBOOK_URL_V;
      
          console.log("payload 1 " ,NAME_EN_V)
      
        //Get Payload End
         executeQuery(`select  ADD_BRANCH('${CREATED_BY_USERNAME}',${GYM_ID_V },'${NAME_EN_V }','${NAME_AR_V }','${BRCH_MGR_V }','${MOBILE_V }','${ADDRESS_V}','${CITY_V}','${EMAIL_V }','${FACEBOOK_URL_V}') from dual `).then( (result)=>{
          console.log("ADD_Branch RES " ,result )
      
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("ADD_Branch ERR " ,err )
      
          });
      
      
      }
      static editBranch =  (req, res) => {
        let jsonData
      
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let BRANCHE_ID_V  = req.body.BRANCHE_ID_V;
        let NAME_EN_V  = req.body.NAME_EN_V;
        let NAME_AR_V  = req.body.NAME_AR_V;
        let MOBILE_V  = req.body.MOBILE_V;
        let EMAIL_V  = req.body.EMAIL_V;
        let BRCH_MGR_V  = req.body.BRCH_MGR_V;
        let ADDRESS_V  = req.body.ADDRESS_V;
        let CITY_V  = req.body.CITY_V;
        let FACEBOOK_URL_V = req.body.FACEBOOK_URL_V;
        let STATUS_V  = req.body.STATUS_V;
      
          console.log("payload 1 " ,NAME_EN_V)
      
        //Get Payload End
         executeQuery(`select  EDIT_GYM_SPECIFIC_BRANCHE('${CREATED_BY_USERNAME}',${BRANCHE_ID_V },'${NAME_EN_V }','${NAME_AR_V }','${BRCH_MGR_V }','${MOBILE_V }','${ADDRESS_V}','${CITY_V}','${EMAIL_V }','${FACEBOOK_URL_V}','${STATUS_V}') from dual `).then( (result)=>{
          console.log("EDIT_GYM_SPECIFIC_BRANCHE RES " ,result )
      
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("EDIT_GYM_SPECIFIC_BRANCHE ERR " ,err )
      
          });
      
      
      }





      static addSection =(req, res) => {
        let jsonData
      
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let NAME_EN_V  = req.body.NAME_EN_V;
        let NAME_AR_V  = req.body.NAME_AR_V;
        let GYM_ID_V  = req.body.GYM_ID_V;
        let BRCH_ID_V  = req.body.BRCH_ID_V;
      
      
          console.log("payload 1 " ,NAME_EN_V)
      
        //Get Payload End
         executeQuery(`select  ADD_SECTION('${CREATED_BY_USERNAME}',${GYM_ID_V },${BRCH_ID_V },'${NAME_EN_V }','${NAME_AR_V }') from dual `).then( (result)=>{
          console.log("ADD_SECTION RES " ,result )
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("ADD_SECTION ERR " ,err )
      
          });
      }


      static editSection = (req, res) => {
        let jsonData
      
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let SECTION_ID_V  = req.body.SECTION_ID_V;
        let BRCH_ID_V  = req.body.BRCH_ID_V;
        let NAME_EN_V  = req.body.NAME_EN_V;
        let NAME_AR_V  = req.body.NAME_AR_V;
        let STATUS_V  = req.body.STATUS_V;
      
      
          console.log("payload 1 " ,NAME_EN_V)
      
        //Get Payload End
         executeQuery(`select  EDIT_GYM_SPECIFIC_SECTIONS('${CREATED_BY_USERNAME}',${SECTION_ID_V },${BRCH_ID_V },'${NAME_EN_V }','${NAME_AR_V }','${STATUS_V }') from dual `).then( (result)=>{
          console.log("EDIT_GYM_SPECIFIC_SECTIONS RES " ,result )
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("EDIT_GYM_SPECIFIC_SECTIONS ERR " ,err )
      
          });
      }


      static addOwnerUser = (req, res) => {
        let jsonData
      
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let GYM_ID_V  = req.body.GYM_ID_V;
        let Full_Name_V  = req.body.Full_Name_V;
        let User_Name_V  = req.body.User_Name_V;
        let User_Password_V  = req.body.User_Password_V;
        let MOBILE_V  = req.body.MOBILE_V;
        let EMAIL_V  = req.body.EMAIL_V;
      
      
      
        //Get Payload End
         executeQuery(`select  ADD_GYM_OWNER('${CREATED_BY_USERNAME}',${GYM_ID_V },'${User_Name_V}','${Full_Name_V }','${User_Password_V }','${MOBILE_V }','${EMAIL_V }') from dual `).then( (result)=>{
          console.log("ADD_SECTION RES " ,result )
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("ADD_GYM_OWNER ERR " ,err )
      
          });
      } 



      static editOwnerUser =  (req, res) => {
        let jsonData
      
        // Get Payload Start
        let CREATED_BY_USERNAME = req.body.CREATED_BY_USERNAME;
        let USR_ID_V  = req.body.USR_ID_V;
        let Full_Name_V  = req.body.Full_Name_V;
        let User_Name_V  = req.body.User_Name_V;
        let User_Password_V  = req.body.User_Password_V;
        let MOBILE_V  = req.body.MOBILE_V;
        let EMAIL_V  = req.body.EMAIL_V;
        let STATUS_V  = req.body.STATUS_V;
      
      
      
        //Get Payload End
         executeQuery(`select  EDIT_GYM_SPECIFIC_OWNER('${CREATED_BY_USERNAME}',${USR_ID_V },'${User_Name_V}','${Full_Name_V }','${User_Password_V }','${MOBILE_V }','${EMAIL_V }','${STATUS_V}') from dual `).then( (result)=>{
          console.log("EDIT_GYM_SPECIFIC_OWNER RES " ,result )
          //  console.log("ADD_GYM RES 2  " , JSON.parse(result.rows[0][0]) )
           result?jsonData = JSON.parse(result.rows[0][0]):null
           res.json(jsonData);
          return user_security_matrix
          }).catch((err)=>{
            console.log("EDIT_GYM_SPECIFIC_OWNER ERR " ,err )
      
          });

        } 
}

module.exports = gymCreationController