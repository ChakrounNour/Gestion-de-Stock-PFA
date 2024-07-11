const db = require('../models');
const Fournisseur = db.Fournisseur;
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nomF){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const fournisseur={
      nomF:req.body.nomF,
      adresseF:req.body.adresseF,
      matriculeFiscale:req.body.matriculeFiscale,
  };
  //save bd
  Fournisseur.create(fournisseur).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th client."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Fournisseur.findByPk(id)
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
    Fournisseur.update(req.body, {
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
    Fournisseur.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "fournisseur was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete fournisseur with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    Fournisseur.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fournisseurs."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
