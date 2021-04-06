const sql = require('../models/db');

const Commentaire = function(commentaire) {
    this.commentaire = commentaire.commentaire,
    this.pseudo = commentaire.pseudo
};

//Route post Commentaire
Commentaire.createCommentaire = (commentaireReqData, result) => {
  console.log('modele: ', commentaireReqData)  
  sql.query(`INSERT INTO commentaires (commentaire, commentaireDate, pseudo, idUser) VALUES(?,NOW(), ?,?)`, [commentaireReqData.commentaire, commentaireReqData.pseudo, commentaireReqData.idUser], (err, res) => {
      if (err) {
        console.log("Erreur lors de l'insertion d'un commentaire", err);
        result(err, null);
      } else {
        console.log("Commentaire créé avec succès");
        result(null, res);
      }
    })
};

//Route delete Commentaire
Commentaire.remove = (id, result) => {
    sql.query(`DELETE FROM commentaires WHERE id = ?`, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      if (res.affectedRows == 0) {
        // commentaire non trouvé avec l'id
        result({ kind: "non trouvé" }, null);
        return;
      }  
      console.log("effacé le commentaire avec l'id: ", id);
      result(null, res);
    });
};

module.exports = Commentaire;