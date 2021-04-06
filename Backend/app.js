const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors')
const userRoutes = require('./routes/user');
const forumRoutes = require('./routes/forum');
const commentaireRoutes = require('./routes/commentaire');

const app = express();

app.use(cors())

/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'developper83',
    database: 'groupomania'
});
db.connect(function(err){
    if(err) throw err;
    console.log("Connecté à la base de données MySQL !");
    db.query("SELECT*FROM users", function (err, result, fields){
        if (err) throw err;
        console.log(result);
    })
});*/


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/commentaire', commentaireRoutes);

module.exports = app;