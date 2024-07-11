const db = require('../models');
const Client = db.Client;
const Magasin = db.Magasin;
const Article=db.Article
const Commande=db.Commande
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nomCli){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const client={
      nomCli:req.body.nomCli,
      prenomCli:req.body.prenomCli,
      telCli:req.body.telCli,
      adresseCli: req.body.adresseCli,
  };
  //save bd
  Client.create(client).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the client."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Client.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th client."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Client.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "client was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update client with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Client.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "client was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete client with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    Client.findAll(
        {
 
         })
 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clients."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
