const sql = require('../models/db');

const Forum = function (forum) {
    this.contenuTexte = forum.post,
    this.pseudo = forum.post
};

//Route post Forum
Forum.createForum = (forumReqData, result) => {  
  console.log('modele: ',forumReqData)
  sql.query(`INSERT INTO forums (contenuTexte, contenuDate, pseudo, idUser) VALUES (?,NOW(), ?,?)`, [forumReqData.post, forumReqData.pseudo, forumReqData.idUser], (err, res) => {
    if (err) {
      console.log("Erreur lors de l'insertion du forum", err);
      result(null, err);
    } else {
      console.log("Forum créé avec succès");
      result(null, res);
    }
  })
};

//Route delete Forum
Forum.deleteForum =(idForum, result) => {
  sql.query(`DELETE FROM forums WHERE idForum=?`,[idForum], (err, res) => {
    if(err){
      console.log('Erreur lors de la suppression du forum');
      result(null, err);
    } else {
      result(null, res);
    }
  })
};

module.exports = Forum;