

(function IFFY(){
	const Promise = require('promise');
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./sm_database.db', {/*verbose: console.log*/} );
   
    let sqlstmt="CREATE TABLE IF NOT EXISTS users " +
                    "("+
                    "ID INTEGER PRIMARY KEY AUTOINCREMENT, USERNAME TEXT, PSWD TEXT, EMAIL TEXT, SERVICES TEXT"+
                    ")";
       
	createTable(sqlstmt);

	sqlstmt="CREATE TABLE IF NOT EXISTS SERVICES " +
                    "("+
                    "ID INTEGER, NAME TEXT"+
                    ")";
       
	createTable(sqlstmt);


	sqlstmt="CREATE TABLE IF NOT EXISTS SED " +
                    "("+
                    "ID INTEGER PRIMARY KEY AUTOINCREMENT, USERID INTEGER, DATA TEXT,Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP"+
                    ")";
    createTable(sqlstmt);
	
	

	var userServices;

	function loadServices(){

        return new Promise((resolve, reject)=>{
                var sql="select * from SERVICES";
				db.all(sql, [], (err, rows)=>{
					if(err){
						    myLog("SQL Error");
						    reject('error');
					}
					else if(rows)
					{
						
						userServices = new Map();
						rows.forEach((row) => {
							userServices.set(row.ID,row.NAME);
						});

						resolve('found');
					}
					else{
						reject('no data');
					}
          
			});
		});
	}
	
	loadServices();

    

    function createTable(sqlstmt){
        const stmt=db.prepare(sqlstmt);
        stmt.run();
	}
			
    function DB_addUser(userEMail, pswd){
		return new Promise((resolve, reject)=>{

			if(!testPswd(pswd))
			{
				reject("invalid password");
			}

			if(!testUserName(userEMail))
			{
				reject("invalid user name");
			}


			db.run("insert into users ('USERNAME', 'PSWD') VALUES(?, ?)",[userEMail, pswd], function(err) {
				if (err) {
					reject("sql error");
				}
				resolve("inserted");
		    });
		});
    }

	function myLog(msg){
		console.log("DB: "+msg);
	}


	function getServiceNames(serviceIDs)
	{

		let ids = serviceIDs.split(',');
		let svcs=[];
		ids.forEach((el)=>{
			svcs.push(userServices.get(parseInt(el)));
		});
		serviceNames = svcs.join(',');
		return serviceNames;
	}


	function DB_getUser(userEmail, userInfo){
		
		myLog("trying to find user: "+userEmail);

        return new Promise((resolve, reject)=>{
                var sql="select * from users where USERNAME=?";
				db.get(sql, [userEmail], (err, row)=>{
					if(err){
						    myLog("SQL Error");
						    reject('error');
					}
					else if(row)
					{
						myLog("Found user");
						userInfo.pswd = row.PSWD;
						userInfo.id = row.ID;
						userInfo.userName = row.USERNAME;
					
						userInfo.availableServices = getServiceNames(row.SERVICES);

	
						resolve('found');
					}
					else{
						myLog("User not found");
						reject('not found');
					}
          
			});
		});
    }

    function DB_getDB(){
		 return db;
	}


	function testPswd(str) { 
			return true;
	} 

	function testUserName(str) { 
			return true;
	} 

	module.exports.DB_addUser = DB_addUser;
	module.exports.DB_getUser=DB_getUser;
	module.exports.DB_getDB = DB_getDB;

	
}());
