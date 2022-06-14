require("dotenv").config();
const {executeQuery}  = require('../db/execute');


const getPrivleages = async (username,path) =>{
  let privleagesName = ""
  // get privleagesName Start
   if(path.includes("/private")){
    privleagesName = "Sales Persons";
   } else if(path.includes("/getGym")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/getModule")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/addGYM")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/getBranch")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/getSection")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/getGYMOwnerUser")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/addBranch")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/addSection")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/addOwnerUser")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/editSection")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/editBranch")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/getGYMSubscribedModule")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/editGYM")){
    privleagesName = "GYM Creation";
   }else if(path.includes("/editOwnerUser")){
    privleagesName = "GYM Creation";
   }else{
    privleagesName = ""
   }
   

    console.log("privleagesName "+privleagesName)
    console.log("path  "+path)
  // get privleagesName Start

      let jsonData
      await executeQuery(`select GET_SECURITY_MATRIX ('${username}')from dual`).then( (res)=>{
      res?user_security_matrix = JSON.parse(res.rows[0][0]):null
      jsonData = JSON.parse(res.rows[0][0])
      return user_security_matrix
      });
      let result 
      let returnResult = ""
      if(privleagesName != ""){
        result = jsonData.filter(user__single_security_matrix => user__single_security_matrix.PRIVILEGE_NAME ===privleagesName)[0]
        returnResult =  ""+result.CAN_READ+result.CAN_WRITE+result.CAN_DELETE
      }
 
  return returnResult;
}

const userAuthorization = async (req, res, next) => {

  // Authenticate token
  try {
    let username =  req.user
    let path = req.path
    // console.log("test : ",test)

    console.log("req 2: ",req.path)

    let securityCode = await getPrivleages(username,path)
    // console.log("lastest ",securityCode.charAt(0) )
    if(securityCode.charAt(0) === '1')
     {
       next()
      } else{
      
        res.status(401).json({
          errors: [
            {
              msg: "401 Unauthorized",
            },
          ],
        });
      

    }
  

  } catch (error) {
    console.log("err", error)
    res.status(401).json({
      errors: [
        {
          msg: "401 Unauthorized",
        },
      ],
    });
  }
};

module.exports = userAuthorization;
