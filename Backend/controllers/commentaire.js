const sql = require('../models/db');
const commentaireModel = require('../models/commentaire');

//Création d'un nouveau commentaire
exports.createCommentaire = (req, res) => {
  console.log("message : ", req.body.message);
  const commentaireReqData = (req.body.message);
  console.log(commentaireReqData);
  if(req.body.message.commentaire.constructor === Object && Object.keys(req.body.message.commentaire).length === 0){
    res.send(400).send({ success: false, message: 'Veuillez remplir un champs' });
  } else {
    console.log("Valeur valide");
    commentaireModel.createCommentaire(commentaireReqData, (err, commentaire) =>{
      if (err)
      res.send(err);
      res.json({ status: true, message: 'Commentaire créé avec succès', data: commentaire.insertId })
    })
  }
};
/*exports.createCommentaire = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide!"
        });
      }
    
      //Création d'un commentaire
      const commentaire = new Commentaire({
        commentaire: req.body.commentaire,
        commentaireDate: req.body.commentaireDate,
        pseudo: req.body.pseudo
      });
    
      //Sauvegarde d'un commentaire dans la base de données
      Commentaire.create(commentaire, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création du commentaire."
          });
        else res.send(data);
      });
};*/

exports.modifyCommentaire = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide!"
        });
      }
    
      //Modification d'un commentaire
      Commentaire.updateById(
        req.params.idCommentaire,
        new Commentaire(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "non trouvé") {
              res.status(404).send({
                message: `Commentaire non trouvé avec l'id ${req.params.idCommentaire}.`
              });
            } else {
              res.status(500).send({
                message: "Une erreur s'est produite lors de la modification du commentaire" + req.params.idCommentaire
              });
            }
          } else res.send(data);
        }
      );    
};

//Suppression d'un commentaire
exports.deleteCommentaire = (req, res) => {    
    Commentaire.remove(req.params.idCommentaire, (err, data) => {
        if (err) {
          if (err.kind === "non trouvé") {
            res.status(404).send({
              message: `Commentaire non trouvé avec l'id ${req.params.idCommentaire}.`
            });
          } else {
            res.status(500).send({
              message: "Impossible de supprimer le commentaire avec l'id " + req.params.idCommentaire
            });
          }
        } else res.send({ message: `Le commentaire a été supprimé avec succès!` });
    });    
};
