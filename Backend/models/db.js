const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//Connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'moderator',
    password: 'groupomania',
    database: 'groupomania'
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Connexion avec succès à la DB !");
});

module.exports = connection;