# SecretMessage
Node/express server for storing crypto wallet, encrypted images and any other personal data.

1) on the command line type:
      node SecretMessage_main.js 
   
2) exit by pressing ctrl-c. this will create empty swlite database sm_database.db.
3) using sqlitebrowser run getstarted.sql. this will put sample users and supported
   services in the database. 
4) on the command line type: 
     node SecretMessage_main.js 
   fire up your browser and connect to it at localhost:3000. use sample user
   mike, password 1234 and login. follow the UI. 


When modifying or adding new react files in staticpages\src folder,  
compile react files in staticpages\src with babel:

        npm install --save-dev @babel/core @babel/cli
        npm install --save-dev @babel/preset-react

        npx babel staticpages/src/ --out-dir staticpages/ --presets=@babel/preset-react