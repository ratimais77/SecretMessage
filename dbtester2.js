const Promise = require('promise');



var tm = 2000;

function getfromdb(){
  return new Promise((resolve, reject)=>{
     setInterval(()=>{resolve("ok")}, tm);
     tm=tm+1000;
  });
}


async function waitForDB(){
    await getfromdb().then((msg)=>{
        console.log("got it from db");
    }).catch((err)=>{
        console.log("got it from db catch");
    });
}


function caller()
{
   console.log("getting");
   waitForDB();
   console.log("gotten");

};

caller();
caller();
caller();


