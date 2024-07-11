const { SSCategorie } = require('../models');
const db = require('../models');
const ssCategorie = db.SSCategorie;
const Categorie = db.Categorie;

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nomSSC){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const ssCategorie={
      nomSSC:req.body.nomSSC,
      categorieSId  :req.params.categorieSId 

     
  };
  //save bd
  SSCategorie.create(ssCategorie).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th sous-sous-categorie."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    ssCategorie.findByPk(id,{include: { association: 'sous-categorie' }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th sous-sous-categorie."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    ssCategorie.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "sous-sous-categorie was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update sous-sous-categorie with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    ssCategorie.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "sous-sous-categorie was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete sous-sous-categorie with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    ssCategorie.findAll({include: { association: 'sous-categorie' }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sous-sous-categories."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
