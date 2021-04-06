const sql = require('../models/db');
const forumModel = require('../models/forum');

//Création d'un nouveau forum
exports.createForum = (req, res) => {
  console.log("message : ", req.body.message);
  const forumReqData = (req.body.message);
  console.log(forumReqData);
  if(req.body.message.post.constructor === Object && Object.keys(req.body.message.post).length === 0){
    res.send(400).send({ success: false, message: 'Veuillez remplir un champs' });
  } else {
    console.log("Valeur valide");    
    forumModel.createForum(forumReqData, (err, forum) =>{
      if (err)
      res.send(err);
      res.json({ status: true, message: 'Forum créé avec succès', data: forum.insertId }) 
    })
  }
};

//Suppression d'un forum
exports.deleteForum = (req, res) => {
  forumModel.deleteForum(req.params.idForum, (err, forum) => {
    if(err)
    res.send(err);
    res.json({ success: true, message: 'Forum supprimé avec succès' });
  })
};

//Récupération de tous les forums et commentaires
exports.getAllForums = (req, res) => {
  sql.query(`SELECT * FROM forums`, (err, result) => { 
  //Requête à mettre en place une fois que la route post des commentaires 
  //SELECT forums.contenuText, forums.pseudo, commentaires.commentaire, commentaires.pseudo FRM forums INNER JOIN commentaires ON forums.idForum = commentaires.idForum
    if (err) {
      console.log("Erreur lors de la récupération des forums ", err);
      res.status(500).json(err)
    } else{    
    console.log("Forums récupérés avec succès", res);
    res.status(200).json({result})
    }
  });
};
