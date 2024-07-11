const { quantite_commande } = require('../models');
const db = require('../models');
const Commande_article = db.quantiter_commander;


exports.create = (req, res) => {

  const comm_art={
    date:req.body.date,
    qteC:req.body.qteC,
    file:req.body.file,

    article_Id:req.params.article_Id,
    commande_Id:req.params.commande_Id

  };
  //save bd
  Commande_article.create(comm_art).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the Commande_article."
      });
  });

};

exports.findOne1 = (req, res) => {
    const id=req.params.id;

    Commande_article.findByPk(id,
      { association :'factureClient'})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th Commande_article."+id
    });
});
};


exports.delete = (req, res) => {
    const id=req.params.id;
    Commande_article.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Commande_article was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete Commande_article with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.GetRapportVente_Mois= (req, res) => {
var mois;
  Commande_article.findAll()
  .then(data => {
   console.log(data)
   data.forEach(element => {
    console.log( element.quantite_commande)
    
   });
  })
    
    
  
  }
exports.find = (req, res) => {
    const com=req.params.commande_Id

  
    Commande_article.findAll(
     { where: {commande_Id: com}})
     
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th Commande_article."+id
    });
  });
  };
exports.findAll= (req, res) => {
    Commande_article.findAll(   
    
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Commande_article."
        });
      });
  };
  exports.update = (req, res) => {
    const id=req.params.id;
    Commande_article.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "quantite_commander was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update quantite_commander with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};