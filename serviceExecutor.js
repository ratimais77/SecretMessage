(function IFFY(){


    const Promise = require('promise');
    const USERSDB  = require('./dbinterface');

    class ServiceExec_SED
    {
        constructor() {
            
        }
        ID(){console.log("SED")};



        storeData(userID, data){
            return new Promise((resolve, reject)=>{

               
                const db = USERSDB.DB_getDB();
    
                db.run("insert into SED ('USERID', 'DATA') VALUES(?, ?)",[parseInt(userID), data], function(err) {
                    if (err) {
                        reject("sql error");
                    }
                    resolve("inserted");
                });
            });
        }

        retrieveAllData(userID, data){

                return new Promise((resolve, reject)=>{

                    const db = USERSDB.DB_getDB();
                    
                        var sql="select * from SED";
                        db.all(sql, [], (err, rows)=>{
                            if(err){
                                    myLog("SQL Error");
                                    reject('error');
                            }
                            else if(rows)
                            {
                                rows.forEach((row) => {
                                    let obj = {sm:'',ts:''};
                                    obj.sm=row.DATA;
                                    obj.ts=row.Timestamp;
                                    data.push(obj);
                                });
        
                                resolve('found');
                            }
                            else{
                                reject('no data');
                            }
                    });
                });
        }
    };

    function createServiceExecutor(serviceName){

        if(serviceName==="SED"){
            return new ServiceExec_SED();
        }
    }

    module.exports.createServiceExecutor=createServiceExecutor;

}())