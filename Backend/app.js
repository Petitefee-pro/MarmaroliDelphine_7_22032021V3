const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors')
const userRoutes = require('./routes/user');
const forumRoutes = require('./routes/forum');
const commentaireRoutes = require('./routes/commentaire');

const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/commentaire', commentaireRoutes);

module.exports = app;