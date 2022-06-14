const oracledb = require('oracledb');
const dbConfig = require('../db/dbconfig');
const config  = require('../db/config');
//Connect to Oracle db Started
// let connection;

module.exports.executeQuery = async (sqlStatment) => {
    let result
    let data_JSON
  try{
  
    connection = await oracledb.getConnection({
      user          : "onemore_upd",
      password      : "Welcome_1",
      connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=onemore.iris-eg.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=orcl)))"
    });
    console.log(`SQL REQ ${sqlStatment}`);
     result = await connection.execute(sqlStatment);
    
    console.log("Successfully connected");
  } catch(err){
    console.log(`dB SQL Errror ${err}`);
  }finally{
  
    if(connection){
        try{
            await connection.close();
  
        }catch(err){
            console.log(`dB Connection Errror ${err}`);
        }
    }
  }
  data_JSON =  JSON.stringify(result)
  
  // console.log("data_JSON ",data_JSON)
  return result ;
  }

    
  
  
  
  //Another way to connect
  // direct fetch
  
  
  
  /*
  oracledb.getConnection(
    dbConfig,
    function(err, connection) {
      if (err) throw err;
  
      var rowsProcessed = 0;
      var startTime = Date.now();
  
      connection.execute(
        'select * from ONEMORE_UPD.SYS_USERS',
        [ config.maxRows ],
        { fetchArraySize: config.batchSize },
        function(err, results) {
          if (err) throw err;
  
          rowsProcessed = results.rows.length;
  
          // do work on the rows here
  
          var t = ((Date.now() - startTime)/1000);
          console.log('Direct fetch:        rows: ' + rowsProcessed +
                      ', batch size: ' + config.batchSize + ', seconds: ' + t);
          
          connection.release(function(err) {
            if (err) console.error(err.message);
          });
        });
    });
    */
  //Connect to Oracle db Ended
 