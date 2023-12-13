const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'jorapi',
  password: '0F0V4PX1hOYcaPyzdYZc',
  database: 'gamereel_vault'
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to the database.");
});

module.exports = connection;
