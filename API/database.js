const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'jorapi',
  password: '0F0V4PX1hOYcaPyzdYZc',
  database: 'gamereel_vault'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
