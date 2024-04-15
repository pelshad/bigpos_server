const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT,
    user: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "node_test",
});

connection.connect(error => {
    if (error) throw error;
    console.log("Connection Success");
})

module.exports = connection;