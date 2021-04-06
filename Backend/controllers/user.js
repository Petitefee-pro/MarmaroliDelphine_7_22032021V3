const sql = require('../models/db');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Création du profil utilisateur
exports.signup = (req, res, next) => {
    console.log("body: ", req.body.identifiant);
    sql.query(`SELECT * FROM users WHERE identifiant = ?`, req.body.identifiant, function(error, _result, _fields){
        console.log(_result)
        if (_result.length > 0 ){
            bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                const user = new User({
                    identifiant: req.body.identifiant,
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash
                })
                User.updateById(user)
                .then(user=>{
                    res.status(200).json({success: "users ajouter avec succès"})
                    console.log(user);
                })
                .catch(err => console.log(err))
            })
        } else {
            return res.status(401).json({ message: "impossible de trouver l'utilisateur !" })            
        }
    })
};

//Connection au profil utilisateur
exports.login = async function(req, res, next){
    const pseudo = req.body.login.pseudo;
    const password = req.body.login.password;
    console.log(req.body);
    console.log(pseudo);
    console.log(password);
    if (pseudo && password){
        sql.query(`SELECT * FROM users WHERE pseudo = ?`, pseudo , function(error, results, fields) {
            if (!results || !(bcrypt.compare(password, results[0].password) )) {
				req.session.loggin = true;
				req.session.pseudo = pseudo;
                req.session.password = password;                         
                res.status(401).json({ 
                    message: 'Mot de passe ou pseudo sont incorrects !'                         
                })                                                         
            } else {
                const idUser = results[0].idUser;
                console.log('okok' + idUser);
                jwt.sign({
                    idUser : idUser,
                    pseudo: pseudo
                },"vfvfkohpovdfvdfvuhdzhvlkzehgvzeghvezghvkledv",(err, token)=>{
                    console.log(token)
                    if(err){
                        console.log('error')
                        res.status(400).json({error: 'erreur lors de la génération du token !'})
                    }
                    res.status(200).json({token, idUser : idUser, pseudo})
                })       
            }
        });
    } else {
        res.send('Merci de rentrer un email et un mot de passe corrects !');
		res.end();
    }
};

//Suppression d'un profil utilisateur
exports.deleteUser = (req, res) => {
    const identifiant = req.body.unsubscribe.identifiant;
    const email = req.body.unsubscribe.email; 
    const password = req.body.unsubscribe.password;
    console.log(req.body);
    console.log(identifiant);
    console.log(email);
    console.log(password);
    if(identifiant && email && password){
        sql.query(`SELECT * FROM users WHERE email = ?`, pseudo , function(error, results, fields) {
            if (!results || !(bcrypt.compare(password, results[0].password) )) {
                res.status(401).json({ 
                    message: 'Mot de passe ou pseudo sont incorrects !'                         
                })                                                         
            } else {
                User.deleteUser() 
                    .then(user=>{
                        res.status(200).json({success: "users ajouter avec succès"})
                        console.log(user);
                    })
                    .catch(err => console.log(err))
            }
        })
    } else {
        return res.status(401).json({ message: "impossible de trouver l'utilisateur !" })            
    }
};
