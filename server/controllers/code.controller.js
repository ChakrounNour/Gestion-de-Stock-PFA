const db = require('../models');
const Article = db.Article;
const Code = db.Code;

//const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  const code={
    dateExpiration:req.body.dateExpiration,
      qte:req.body.qte,
      articleId: req.params.articleId

  };
  //save bd
  Code.create(code).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the code."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    Code.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th code."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Code.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "code was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update code with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Code.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "code was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete code with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
    Code.findAll(
        { include : [ {model: Article,include: [
            { association: 'sscategorie' ,include:{association: 'sous-categorie',include:{ association: 'categorie'}} },
            { association :'fournisseur'},
            { association : 'facture'},
            {association:'marque'}],
      as: 'codeart'}]},

    )
    
    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving codes."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
