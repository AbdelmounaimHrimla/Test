const mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'abdelmounaim',
    database : 'cars'
});


connection.connect(function(error, result) {
    if(error) {
        console.log("My Errors",error);
    } else {
        console.log("My Connect => Success");
        console.log("---------------------");
    }
})
    

module.exports = connection;