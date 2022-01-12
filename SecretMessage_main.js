
const http = require('http');
const express = require('express');
const {v4: uuidv4} = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const USERS = require('./usermgmt.js');
const path = require('path');
const CookieParser = require('cookie-parser');
const SERVEXEC = require('./serviceExecutor.js');


const multer = require('multer');
const upload = multer();

// create the server
const app = express();





app.use(express.static('staticpages'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(CookieParser());
app.use((req, res, next)=>{
   next();
});



app.use(session({
  genid: (req) => {
    let id = uuidv4();
    myLog('Generated new ID ' + id.toString());
    return id; // use UUIDs for session IDs
  },
  store: new FileStore({retries: 2}),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
   async ( email, password, done) => {
            let user={};
            await USERS.isUserValid(email, password, user).then((code)=>{
                done(null, user);
            }).catch((err)=>{
                done(null, false);
            });
  }
));

//write user into cookie/session file
passport.serializeUser((user, done) => {
  if(user)
  {
    let token = USERS.getTokenToSerialize(user);
     done(null, token);
  }
  else
     done(null, null);
});

//get user from cookie/session file
passport.deserializeUser((token, done) => {
    var user={};
    if(USERS.getActiveUser(token, user))
    {
        return done(null, user);
    }
    return done(null, null);

});


app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    req.login(user, (err) => {
      if(err)
      {
        req.session.destroy();
        res.redirect('/loginFailed');
      }
      else
      { 
        res.redirect('/loginOK');
      }
    });
   
  })(req, res, next);
})

app.post('/logout', (req, res, next) => {
  if(req.isAuthenticated()){
        req.session.destroy();
        sendResponse(res, "loggedOut", "");
  }
});

app.post('/sed_store',  (req, res, next) => {
  if(req.isAuthenticated()){

    if(req.body.method=='store'){
        var user={};
        USERS.getActiveUser(req.session.passport.user, user);

        let se = SERVEXEC.createServiceExecutor('SED');

        se.storeData(user.id, req.body.secretData).then((msg)=>{

          sendResponse(res, "saved", "");
        }).catch((err)=>{
          sendResponse(res, "not saved", err);
        });
      }
      else if(req.body.method=='retrieve'){
        var user={};
        USERS.getActiveUser(req.session.passport.user, user);

        let se = SERVEXEC.createServiceExecutor('SED');

        let allData=[];
        se.retrieveAllData(user.id, allData).then((msg)=>{

          myLog("Here 1")
          let r={code: "OK", storedData: allData};
          res.send(JSON.stringify(r));
        }).catch((err)=>{
          myLog("Here 2")
          sendResponse(res, "Error", err);
        });
      }
  }
});


app.post('/createUser', (req, res, next) => {

  let user = req.body.email;
  let pswd = req.body.password;

  USERS.isUserInDB(user, pswd).then((msg)=>{
    sendResponse(res, "userFailed", msg);
  }).catch((err)=>{

    USERS.createUser(user, pswd).then((msg)=>{
      sendResponse(res, "userOK", msg);
    }).catch((err)=>{
      sendResponse(res, "userFailed", err);
    });

  });
  
});

app.post('/getUserInfo', (req, res, next) => {
  if(req.isAuthenticated()){


    var user={};
 
    USERS.getActiveUser(req.session.passport.user, user);


       let svcsArr = user.availableServices.split(',');

       let svcsObjs=[];
       svcsArr.forEach((el)=>{     
                        svcsObjs.push({name: el});
                   });

       let r={code: "userInfo", 
              userInfo: {userName: user.userName},
              features: svcsObjs
             };
       res.send(JSON.stringify(r));
  }
});

app.get('/loginOK', function(req, res, next) {
  sendResponse(res, "loginOK", "");
});

app.get('/loginFailed', function(req, res, next) {
    sendResponse(res, "loginFailed", "");
});

app.get('/', function(req, res) {
  myLog("/");
  res.sendFile(path.join(__dirname + '/staticpages/mainapp.html'));
});


// tell the server what port to listen on
app.listen(3000, () => {
  myLog('Listening on localhost:3000');
})

function myLog(msg){
  console.log("MAIN: "+msg);
}
function sendResponse(resp, respCode, errDesc){
  myLog("Response code="+respCode+","+errDesc);
  let r={code: respCode, err1: errDesc};
  resp.send(JSON.stringify(r));
}