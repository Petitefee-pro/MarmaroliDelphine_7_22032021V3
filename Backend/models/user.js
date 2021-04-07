const sql = require('../models/db');

const User = function(user){
    this.identifiant = user.identifiant,
    this.pseudo= user.pseudo,
    this.email = user.email,
    this.password = user.password
};

//Route post signup
User.updateById = (user, success, error) => {
    console.log(user)
    sql.query(`UPDATE users SET pseudo = ?, email = ?, password = ? WHERE identifiant = ?`, 
    [user.pseudo, user.email, user.password, user.identifiant],
    (err, res) => {
        if (err){
            console.log("error: ", err);            
            error(err)
        }
        if(res.affectedRows == 0){         
            error(err)           
        } else{
            success()
        }
        
    });
};

//Route delete Profil
User.deleteProfil = (user) => {
    console.log(user);
    sql.query(`UPDATE users SET email = "NULL", password = "NULL" WHERE identifiant = ?`,
    [user.email, user.password, user.identifiant], 
    (err, res) => {
        if(err){
            console.log('Erreur lors de la suppression du profil utilisateur');
            return(null, err);
        }
        if(res.affectedRows == 0){         
            console.log('Utilisateurs non trouvé !')
            return({ kind: 'Utilisateur non trouvé !' }, null);    
      } else {
            console.log('suppression du profil : ',  { identifiant: user.identifiant, ...user })
            return({ identifiant: user.identifiant, ...user }, null);
      }
    })
};

module.exports = User;