const { quantiter_commander } = require('../models');
const db = require('../models');
const Commande = db.Commande;
//const Op = db.Sequelize.Op;
const Article=db.Article
const Client=db.Client
const quantite_commande=db.quantite_commande

exports.create = (req, res) => {
    var p=0
    console.log("artttttttttt"+req.params.article_id)
    console.log("ouiiiiiiii"+req.params.value)

    Article.findOne(
        { where: {id: req.params.article_id}},
     
      )
       .then(data => {
       
           p=data.prixTTC
           console.log(p)
           console.log(req.params.value)
           console.log(req.body.qteC)

           const commande={
            dateC:req.body.dateC,
            qteC:req.body.qteC,
            montant:req.params.value=="Oui"?(req.body.qteC*p)+7:(req.body.qteC*p),
            client_Id :req.params.client_Id
             
          };
  //save bd
  Commande.create(commande).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th commande."
      });
  });
       })



};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Commande.findByPk(id,{include: { association: 'client' }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th commande."+id
    });
});
};
exports.find = (req, res) => {
    const name=req.params.client_Id
  
    Commande.findOne(
     { where: {client_Id: name}},
     { include : [ {model: Article, through: 'quantite_commande', as: 'factureClient'}]},

     {include: 
        { association: 'client' }}

   
          )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th article."+id
    });
  });
  };
  
exports.update = (req, res) => {
    const id=req.params.id;
    Commande.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Commande was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update commande with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Commande.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "commande was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete commande with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    client_id=req.params.client_Id 
    Commande.findAll(
       { include : [ {model: Article,
           through: 'quantite_commande', as: 'factureClient'}]

        })

      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving commandes."
        });
      });
  };
exports.findAll2= (req, res) => {
    client_id=req.params.client_Id
     Commande.findAll(
       { include : [ {model: Article,
           through: 'quantite_commande', as: 'factureClient'}],
           where : {client_Id  : client_id },

        })
  
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving commandes."
        });
      });
  };
