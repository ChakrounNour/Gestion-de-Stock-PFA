const db = require('../models');
const Depot = db.stock_article;
const Article=db.Article
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
 
  const depot={
    stock_id:req.params.stock_id,
    article_Id:req.params.article_Id,
    qteArticle:req.body.qteArticle

  };
  //save bd
  Depot.create(depot).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the depot."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Depot.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th depot."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Depot.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "depot was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update depot with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Depot.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "depot was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete depot with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
const article_id=req.params.article_Id
    Depot.findAll({
        where : {article_Id : article_id }

     } )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving depots."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
