const db = require('../models');
const Article = db.Article;
const Zone = db.Zone;

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const zone={
    nomZ:req.body.nomZ
  };
  //save bd
  Zone.create(zone).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the zone."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Zone.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th zones."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Zone.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "zone was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update zone with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Zone.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "zone was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete zone with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    Zone.findAll()
    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving zones."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
