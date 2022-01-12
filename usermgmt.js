(function IFFY(){

    const USERSDB  = require('./dbinterface');
    const Promise  = require('promise');

    var activeUsers = new Map();

    function myLog(msg){
		console.log("UserMgmt: "+msg);
    }
    

    async function isUserNameInDB(userName)
    {
        return new Promise(async (resolve, reject)=>{
            let userInfo = {};
            await USERSDB.DB_getUser(userName, userInfo).then((msg)=>{
                resolve("yes");
             }).catch((err)=>{
                reject("no");
             });
            });
    }

    async function createUser(userName,password)
    {
        return new Promise(async (resolve, reject)=>{
            await USERSDB.DB_addUser(userName, password).then((msg)=>{
                resolve(msg);
             }).catch((err)=>{
                reject(err);
             });
            });
    }


    

    async function isUserValid(userName, password, userObj)
    {
        myLog("Trying to validate user: "+userName);
        return new Promise(async (resolve, reject)=>{
           
            let userInfo = {};
            await USERSDB.DB_getUser(userName, userInfo).then((msg)=>{
                if(userInfo.pswd===password)
                {
                    myLog("Validated");
                    userObj.id = userInfo.id;
                    userObj.name = userInfo.userName;
                    userObj.availableServices = userInfo.availableServices;
                    AddToMap(userObj);
                    resolve(msg);
                }
                else
                {
                    myLog("Not Validated, password mismatch");
                    reject("password mismatch");
                }
             }).catch((err)=>{
                myLog("Not found");
                reject(err);
             });
        });
    }

    function AddToMap(user)
    {
        activeUsers.set(user.id, user);
    }
    
    function getTokenToSerialize(user)
    {
        return user.id;
    }

    function getActiveUser(token, user)
    {
        myLog("searching for active user with: "+token);
         if(activeUsers.has(token)){
             myLog("Found active user");
             let memuser = activeUsers.get(token);
             
             user.name = memuser.name;
             user.id = memuser.id;
             user.availableServices = memuser.availableServices;
             
             return true;
         }
         myLog("Could not find active user");
         return false;
    }

    module.exports.getTokenToSerialize = getTokenToSerialize;
    module.exports.getActiveUser = getActiveUser;
    module.exports.isUserValid = isUserValid;
    module.exports.isUserInDB = isUserNameInDB;
    module.exports.createUser=createUser;
}());
