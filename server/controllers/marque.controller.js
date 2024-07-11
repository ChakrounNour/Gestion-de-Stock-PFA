const db = require('../models');
const Article = db.Article;
const Marque = db.Marque;

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const m={
    nomM:req.body.nomM
  };
  //save bd
  Marque.create(zone).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the marque."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Marque.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th marques."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Marque.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "marque was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update marque with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Marque.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "marque was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete marque with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    Marque.findAll()
    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving marques."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
