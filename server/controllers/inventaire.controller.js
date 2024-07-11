const db = require('../models');
const Inventaire = db.Inventaire;
const Inventaire_article = db.inventaire_article;
const Article=db.Article
const Depot=db.Article
const stock_article=db.stock_article
const Stock=db.Stock
const Zone=db.Zone
exports.create = (req, res) => {
 
  const inventaire={
      annee:req.body.annee     
  };
  //save bd
  Inventaire.create(inventaire).then(data => {
      res.send(data);

  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th inventaire."
      });
  });
 

};

exports.findOne = (req, res) => {
    const id=req.params.id;

    Inventaire.findByPk(id,{include: { association: 'articleInventaire' }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th Inventaire."+id
    });
});
};

exports.update = (req, res) => {
    const id=req.params.id;
    Inventaire.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Inventaire was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update inventaire with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Inventaire.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Inventaire was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete Inventaire with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.GetRapport =(req,res) =>{
    Date.today().add(-30).days();
console.log(Date.today().add(-30).days())
    Article.findByPk(req.params.article_Id).then(project => {
        console.log("p"+project.qte)
    })
    Commande_article.findAll(
        { where: {article_Id: req.params.article_Id}})
        
       .then(data => {
           for ( valeur of data) {
            qteCommande=valeur.qteC+qteCommande

       }})
}
exports.findAll= (req, res) => {
    
    Inventaire.findAll(    {

        include : [ {model: Article, include: [{ 
            association:'sscategorie'
         },        {   model:Stock ,include:[{model:Zone,as:'zone'}],association:'stock_art',
        }],
           through: 'inventaire_article', as: 'inventaire_art'}]

        })

      .then(data => {
        res.send(data);
      })

      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Inventaire."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
