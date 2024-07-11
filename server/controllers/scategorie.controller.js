const db = require('../models');
const SousCategorie = db.SousCategorie;
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nomSC){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const sousCategorie={
      nomSC:req.body.nomSC,
      categorieId :req.params.categorieId
     
  };
  //save bd
  SousCategorie.create(sousCategorie).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th sous-categorie."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    SousCategorie.findByPk(id,{include: { association: 'categorie' }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th sous-categorie."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    SousCategorie.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "sous-categorie was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update sous-categorie with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    SousCategorie.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "sous-categorie was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete sous-categorie with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    SousCategorie.findAll({include: { association: 'categorie' }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sous-categories."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
