const { checkPreferences } = require('joi');
const db = require('../models');
const Article=db.Article
const Commande=db.Commande
const Inventaire_article = db.inventaire_article;
const quantite_ajout = db.quantiter_ajouter;
const Inventaire=db.Inventaire
const { quantite_commande } = require('../models');
const Commande_article = db.quantiter_commander;

const Depot = db.depot_article;

exports.create = (req, res) => {
    var qteA=0
    var qteCommande=0
    const id=req.params.id;

    Article.findByPk(req.params.article_Id).then(project => {
        console.log("p"+project.qte)
        qteA=project.qte
        article_Id=req.params.article_id 
        Commande_article.findAll(
            { where: {article_Id: req.params.article_Id}})
            
           .then(data => {
               for ( valeur of data) {
                qteCommande=valeur.qteC+qteCommande
    
              }
              const inventaire_art={
                inventaire_Id:req.params.inventaire_Id,
                article_Id :req.params.article_Id ,
                qteCommande:qteCommande,
                qteA:qteA,
                qte:(qteCommande<qteA)? qteA-qteCommande: qteCommande-qteA,
                etat:(qteCommande==qteA)? "Epuisé":"En Stock",
               
            };
            console.log(qteA)
            console.log(qteCommande)
              Inventaire_article.create(inventaire_art).then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message:
                    err.message || "some error occured while creating th inventaire_article."
                });
            });
      
      
            Depot.find({ where: { article_id: req.params.article_Id } })
            .on('success', function (project) {
              // Check if record exists in db
              if (project) {
                project.update({
                  title: 'a very different title now'
                })
                .success(function () {})
              }
            })
  
         
          })
    

      
        })

};
exports.getRapport=(req,res ) =>{

var qteCommande=0,qteA=0,article=""
    Article.findAll({
      
     
    }  
)
  .then(data => {
    for (valeur of data){
        var qteA=valeur.qte
        var article=valeur.nomA
    Commande_article.findAll(
        { where: {article_Id: req.params.article_Id}})
        
       .then(data => {
           for ( valeur of data) {
            qteCommande=valeur.qteC+qteCommande
     


          }
          console.log(qteCommande)
          pourcentage=((qteCommande*100)/qteA).toFixed(2)
          console.log("calcul"+pourcentage)
          
          res.status(500).send({
            message:article,
           pourcentage:pourcentage
        });
     

        })
        

    
   
    }
  })

     
      


  


};


exports.update = (req, res) => {
    const id=req.params.id;
    Inventaire_article.update(req.body, {
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
    Inventaire_article.destroy({
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
exports.findAll= (req, res) => {
   

    Inventaire_article.findAll({
      
     
        }  
    )
      .then(data => {

        res.send(data);
        console.log(data)
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
