const db = require('../models');
const Categorie = db.Categorie;
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nomC){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const categorie={
      nomC:req.body.nomC,
     
  };
  //save bd
  Categorie.create(categorie).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th categorie."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Categorie.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th categorie."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Categorie.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "categorie was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update categorie with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Categorie.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "categorie was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete categorie with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    Categorie.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
