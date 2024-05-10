const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Slucter1337@@@',
    database : 'be_test_eigen'
});
   
connection.connect((err)=>{
    if(err) console.log(`Error Mysql : ${err}`)
        console.log('DB CONNECTED');
});

module.exports = connection