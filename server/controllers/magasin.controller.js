const db = require('../models');
const dbb = require('_helpers/db');
const { stock_user } = require('../models');
const Magasin = db.Stock;
const User= db.User
const Article=db.Article
const Stock_User=db.stock_user
const sequelize=db.sequelize
// Create and Save new Comments
exports.create =(req, res) => {
    if (!req.body.nom){
        res.status(400).send({
            message: "content can not be empty"
        });
        return;
    }
   
    const magasin={
        nom:req.body.nom,
        adresseLocal:req.body.adresseLocal,
        label:"Magasin",
        zoneId:req.params.zoneId,

    };
    //save bd
    Magasin.create(magasin).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th magasin."
        });
    });
  
  };
  exports.update = (req, res) => {
    const id=req.params.id;
    Magasin.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "magasin was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update client with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};
exports.findCount2 =( req,res) => {
    Magasin.findAll({
        attributes: { 
            include: [[Sequelize.fn("COUNT", Sequelize.col("stock_user.id")), "stockUser"]] 
        },
        include: [{
            model: User, attributes: []
        }]
    });
}
exports.addArticle = (req, res) => {
    const id=req.params.id;
    var qteAll,depot,article

    const stock={
        qteArticle:req.body.qteArticle,
        article_Id:req.params.article_Id,
        stock_id:req.params.stock_id,


    };
            sequelize.query("SELECT sum(qteArticle) as sum,s.id as id FROM `stock_articles` ,stocks s, articles a WHERE s.id=stock_articles.stock_id and a.id=stock_articles.article_Id and s.label='Depot' and article_Id='"+req.params.article_Id+"'").then(([results, metadata]) => {
                console.log("aaaaaaa1"+results[0])
              
                for (valeur of results){
                    console.log(valeur)
                    qteAll=valeur.sum
                    depot=valeur.id   
                    console.log("sum"+qteAll)
                    console.log("qteA"+req.body.qteArticle) 
                    console.log(typeof(qteAll))
                    console.log(typeof(req.body.qteArticle))
                    const qte=parseInt(qteAll)
console.log(typeof(qte),qte)
console.log(typeof(qte),qte)
const qte2=parseInt(req.body.qteArticle)
console.log(typeof(qte2),qte2)
console.log((qte>qte2))
console.log("dept"+typeof(depot),depot)

                    if (qte>qte2){
                        stock_article.create(stock)
                
sequelize.query("SELECT * FROM `stock_articles` WHERE stock_id='"+depot+"' and article_Id='"+req.params.article_Id+"'").then(([results, metadata]) => {
    for (valeur of results){
        stock_id=valeur.id   
        console.log("stock_id"+stock_id)
        
        sequelize.query("UPDATE `stock_articles` SET `qteArticle`=qteArticle-'"+qte2+"' where id='"+stock_id+"'").then(([results, metadata]) => {
            console.log(results)
        
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occured while creating th rapport."
            });
        });
        })
    }
})
  
}
          
       
            }
   
    

            })
  

                    };
exports.updateQte = (req, res) => {
    const id=req.params.id;
    var qteAll,depot,article
    stock_article.findByPk(id)
    .then(data => {
            console.log(data.article_Id),
            article=data.article_Id
            sequelize.query("SELECT sum(qteArticle) as sum,s.id as id FROM `stock_articles` ,stocks s, articles a WHERE s.id=stock_articles.stock_id and a.id=stock_articles.article_Id and s.label='Depot' and article_Id='"+data.article_Id+"'").then(([results, metadata]) => {
                console.log("aaaaaaa1"+results[0])
              
                for (valeur of results){
                    console.log(valeur)
                    qteAll=valeur.sum
                    depot=valeur.id   
                    console.log("sum"+qteAll)
                    console.log("qteA"+req.body.qteArticle) 
                    console.log(typeof(qteAll))
                    console.log(typeof(req.body.qteArticle))
                    const qte=parseInt(qteAll)
console.log(typeof(qte),qte)
console.log(typeof(qte),qte)
const qte2=parseInt(req.body.qteArticle)
console.log(typeof(qte2),qte2)
console.log((qte>qte2))
console.log("dept"+typeof(depot),depot)

                    if (qte>qte2){
                        stock_article.update(req.body, {
                            where : {id : id }
                        })
                        .then(num => {
                            if (num==1){
                            res.send({
                                message : "magasin was updated successfully"
                            });}
                            else { 
                                res.send({
                                message : ` cannot update client with id=${id}.Myabe...!`
                            });
                        }
                        })
                        .catch(err => { res.status(500).send({
                            message: "error updated"+id
                        });
                    })  
sequelize.query("SELECT * FROM `stock_articles` WHERE stock_id='"+depot+"' and article_Id='"+article+"'").then(([results, metadata]) => {
    for (valeur of results){
        stock_id=valeur.id   
        console.log("stock_id"+stock_id)
        
        sequelize.query("UPDATE `stock_articles` SET `qteArticle`=qteArticle-'"+qte2+"' where id='"+stock_id+"'").then(([results, metadata]) => {
            console.log(results)
        
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occured while creating th rapport."
            });
        });
        })
    }
})
  
}
          
       
            }
   
    

            })
    })
    

                    };
 exports.countMagasin= (req, res) => {
   
    sequelize.query("SELECT count(s.id) as nbr FROM `users` u , stocks s, stock_users s_u where s.id=s_u.stock_id and u.id=s_u.user_Id and s.label like 'Magasin' and s_u.user_Id like '"+req.params.userId+"'").then(([results, metadata]) => {
                console.log("test"+results)
                res.send(results)
                           
                        .catch(err => {
                            res.status(500).send({
                                message:
                                err.message || "some error occured while creating th rapport."
                            });
                        });
                        
                    })}
exports.findAll= (req, res) => {
   
    userId=req.params.userId;
    sequelize.query("SELECT *,s.id as ids FROM `users` u , stocks s, stock_users s_u where s.id=s_u.stock_id and u.id=s_u.user_Id and s.label like 'Magasin' and s_u.user_Id like '"+userId+"' "
  ,{ replacements: ['active'], type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  res.send(projects)
})
   /* Magasin.findAll(
        {include : [{association : 'zone'},
        {model: Article, 
            through: 'stock_article', as: 'stock1'},

       {    model:User , 
            through: 'stock_user',
            as: "stockUser"
        }
        ],
        where : {user_Id :userId  ,label : "Magasin" }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving magasin."
        });
      });*/
  };
  exports.GetAll= (req, res) => {
   
    Magasin.findAll(
        {        include : [{
            association : 'zone'},
            {model: Article, 
            through: 'stock_article', as: 'stock1'},
            {model: User, 
                through: 'stock_user', as: 'stockUser'}
        ]
 
    ,
    where : {label : "Magasin" }
}
        )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving magasin."
        });
      });
  };
  
  exports.delete = (req, res) => {
    const id=req.params.id;
    Magasin.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Magasin was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete magasin with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};


exports.findOne = (req, res) => {
    const id=req.params.id;
     
    Magasin.findByPk(id,{
        include : [ {association : 'zone'},{ association: 'user' },{model: Article,
          
            through: 'stock_article', as: 'stock1'}],
            where : {label : "Magasin" }
        }
 )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating the magasin."+id
    });
});

}
