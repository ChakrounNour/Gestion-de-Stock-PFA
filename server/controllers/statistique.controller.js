const db = require('../models');
const SSCategorie = db.SSCategorie;
const Article = db.Article;
const sequelize=db.sequelize
const SousCategorie = db.SousCategorie;
const webPush = require('web-push');
exports.graphiqueDynamique=(req,res) =>{
  sequelize.query(" SELECT sum(c.qte) as sum,f.nomF,m.nomM FROM articles as a,codes c ,fournisseurs f ,marques m WHERE f.id=a.fournisseurId and c.articleId=a.id and m.id=a.marqueId and m.id like'"+req.params.nomM+"'GROUP by f.nomF").then(([results, metadata]) => {
    console.log(results)
    res.send(results)

  .catch(err => {
    res.status(500).send({
        message:
        err.message || "some error occured while creating th rapport."
    });
});
  })
}
exports.getStatMagasin=(req,res ) =>{
  console.log(req.params.zone)
      if (req.params.zone=="all" && req.params.date=="all")
    {
      sequelize.query("SELECT sum(qteC*prixTTC) as CA ,stock_id,nom,adresseLocal FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and label='Magasin' group by stock_id").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
    }else if (req.params.date=="Derniers 30 jours" && req.params.zone=="all" )
    {
    sequelize.query("SELECT sum(qteC*prixTTC) as CA ,stock_id,nom,adresseLocal FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and label='Magasin' and q.date >= (CURDATE() - INTERVAL 1 MONTH )   group by stock_id").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
    }
    else if (req.params.date=="Derniers 30 jours" && req.params.zone!="all" )
    {
    sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 1 MONTH ) and label='Magasin' group by stock_id HAVING z.nomZ like  '"+req.params.zone+"'").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
    }
    else if (req.params.date=="Les 3 derniers mois" && req.params.zone!="all" )
    {
    sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 3 MONTH ) and label='Magasin' group by stock_id HAVING z.nomZ like  '"+req.params.zone+"'").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
    }
    else if (req.params.date=="all" && req.params.zone!="all" )
    {
    sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and label='Magasin' group by stock_id HAVING z.nomZ like '"+req.params.zone+"'").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
    }
  else if (req.params.date=="Les 3 derniers mois" && req.params.zone=="all" )
  {
  sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 3 MONTH ) and label='Magasin' group by stock_id").then(([results, metadata]) => {
      console.log(results)
      res.send(results)
  
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th rapport."
      });
  });
    })
  }
  else if (req.params.date=="Les 6 derniers mois" && req.params.zone!="all" )
  {
  sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 6 MONTH ) and label='Magasin' group by stock_id HAVING z.nomZ like  '"+req.params.zone+"'").then(([results, metadata]) => {
      console.log(results)
      res.send(results)
  
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating th rapport."
      });
  });
    })
  }
else if (req.params.date=="Les 6 derniers mois" && req.params.zone=="all" )
{
sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 6 MONTH ) and label='Magasin' group by stock_id ").then(([results, metadata]) => {
    console.log(results)
    res.send(results)

.catch(err => {
    res.status(500).send({
        message:
        err.message || "some error occured while creating th rapport."
    });
});
  })
}
else if (req.params.date=="Les 12 derniers mois" && req.params.zone!="all" )
{
sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 12 MONTH ) and label='Magasin' group by stock_id HAVING z.nomZ like  '"+req.params.zone+"'").then(([results, metadata]) => {
    console.log(results)
    res.send(results)

.catch(err => {
    res.status(500).send({
        message:
        err.message || "some error occured while creating th rapport."
    });
});
  })
}
else if (req.params.date=="Les 12 derniers mois" && req.params.zone=="all" )
{
sequelize.query("SELECT sum(qteC*prixTTC) as CA,stock_id,nom,adresseLocal,nomZ FROM `stock_articles` as m_a,commandes c ,quantite_commandes q,articles as a,stocks as m ,zones as z WHERE a.id=m_a.article_id and m_a.stock_id=m.id and q.article_Id=a.id and q.commande_Id=c.id and z.id=m.zoneId and q.date >= (CURDATE() - INTERVAL 12 MONTH ) and label='Magasin' group by stock_id ").then(([results, metadata]) => {
  console.log(results)
  res.send(results)

.catch(err => {
  res.status(500).send({
      message:
      err.message || "some error occured while creating th rapport."
  });
});
})
}
  
        };
      
        exports.getStatPeriode=(req,res ) =>{
          if (req.params.marque=="all" && req.params.fournisseur=="all" && req.params.categorie=="all"){

          sequelize.query("SELECT sum(qteC*prixTTC) as CA ,MONTHNAME(q.date) as MONTHNAME FROM commandes c ,quantite_commandes q,articles as a WHERE q.article_Id=a.id and q.commande_Id=c.id  group by MONTH(q.date)").then(([results, metadata]) => {
            console.log(results)
            res.send(results)
        
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occured while creating th rapport."
            });
        });
          })}
         else if (req.params.marque=="all" && req.params.fournisseur!="all" && req.params.categorie=="all")
            {
          sequelize.query("SELECT sum(qteC*prixTTC) as CA ,MONTHNAME(q.date) as MONTHNAME FROM commandes c ,quantite_commandes q,articles as a,fournisseurs f WHERE f.id=a.fournisseurId and q.article_Id=a.id and q.commande_Id=c.id  and f.nomF like'"+req.params.fournisseur+"'group by MONTH(q.date)"
          ).then(([results, metadata]) => {
            console.log(results)
            res.send(results)
        
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occured while creating th rapport."
            });
        });
          })
        }
        else if (req.params.marque!="all" && req.params.fournisseur=="all" && req.params.categorie=="all")
           {
         sequelize.query("SELECT sum(qteC*prixTTC) as CA ,MONTHNAME(q.date) as MONTHNAME FROM commandes c ,quantite_commandes q,articles as a,marques as m,fournisseurs f WHERE f.id=a.fournisseurId and q.article_Id=a.id and m.id=a.marqueId and q.commande_Id=c.id and m.nomM  like'"+req.params.marque+"' group by MONTH(q.date) "
         ).then(([results, metadata]) => {
           console.log(results)
           res.send(results)
       
       .catch(err => {
           res.status(500).send({
               message:
               err.message || "some error occured while creating th rapport."
           });
       });
         })
      
    
        } else if (req.params.marque=="all" && req.params.fournisseur=="all" && req.params.categorie!="all")
        {
      sequelize.query("SELECT sum(qteC*prixTTC) as CA ,MONTHNAME(q.date) as MONTHNAME FROM commandes c ,quantite_commandes q,articles as a,sscategories sc, souscategories sct, categories ct,fournisseurs f WHERE f.id=a.fournisseurId and q.article_Id=a.id and q.commande_Id=c.id and a.sscategorieId=sc.id and sct.id=sc.categorieSId and sct.categorieId=ct.id and ct.nomC like'"+req.params.categorie+"' group by MONTH(q.date)"
      ).then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
   
 
     }
     else if (req.params.marque=="all" && req.params.fournisseur!="all" && req.params.categorie!="all")
        {
      sequelize.query("SELECT sum(qteC*prixTTC) as CA ,MONTHNAME(q.date) as MONTHNAME FROM commandes c ,quantite_commandes q,articles as a,sscategories sc, souscategories sct, categories ct,fournisseurs f WHERE f.id=a.fournisseurId and q.article_Id=a.id and q.commande_Id=c.id and a.sscategorieId=sc.id and sct.id=sc.categorieSId and sct.categorieId=ct.id and ct.nomC like'"+req.params.categorie+"' and f.nomF like'"+req.params.fournisseur+"'  group by MONTH(q.date)"
      ).then(([results, metadata]) => {
        console.log(results)
        res.send(results)
    
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
      })
   
 
     }
     else if (req.params.marque!="all" && req.params.fournisseur!="all" && req.params.categorie!="all")
     {
   sequelize.query("SELECT sum(qteC*prixTTC) as CA ,MONTHNAME(q.date) as MONTHNAME FROM commandes c ,quantite_commandes q,articles as a,sscategories sc, souscategories sct, categories ct,fournisseurs f,marques m WHERE f.id=a.fournisseurId and q.article_Id=a.id and q.commande_Id=c.id and a.sscategorieId=sc.id and sct.id=sc.categorieSId and m.id=a.marqueId and sct.categorieId=ct.id and ct.nomC like'"+req.params.categorie+"' and f.nomF like'"+req.params.fournisseur+"' and m.nomM like'"+req.params.marque+"' group by MONTH(q.date)"
   ).then(([results, metadata]) => {
     console.log(results)
     res.send(results)
 
 .catch(err => {
     res.status(500).send({
         message:
         err.message || "some error occured while creating th rapport."
     });
 });
   })


  }
            };
        
    