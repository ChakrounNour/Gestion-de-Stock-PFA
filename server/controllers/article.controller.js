const db = require('../models');
const SSCategorie = db.SSCategorie;
const Article = db.Article;
const SousCategorie = db.SousCategorie;
const webPush = require('web-push');
const Code=db.Code
const sequelize=db.sequelize
const publicVapidKey = "BEYzlweH5KHSlMK9hnLcpM7YT0e1wasth-mLUK7WGy6K08jyWJde_sOT1q2Zvlt5aroRR0GtRWRqfZYfGBq5FBQ"
const privateVapidKey = "qZEEuYrfYMjA5blibjM7zXh87Y4TYY7Veo0gpjy1KaI"
const Stock_article=db.stock_article
const Stock=db.Stock

// Replace with your email
webPush.setVapidDetails('mailto:example@yourdomain.org', publicVapidKey, privateVapidKey);

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
 /* const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });*/
  
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nomA){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const article={
      nomA:req.body.nomA,
      descriptionA:req.body.descriptionA,
      image:req.body.image,
      promotion: req.body.promotion,
      prixUnitaireInitial:req.body.prixUnitaireInitial,
      prixUnitairePromo: req.body.promotion==0 ?req.body.prixUnitaireInitial: (req.body.prixUnitaireInitial - (req.body.prixUnitaireInitial*req.body.promotion)/100 ) ,
      prixTTC: (req.body.prixUnitaireInitial+ (req.body.prixUnitaireInitial+req.body.TVA )/100),

      TVA: req.body.TVA,
      sscategorieId: req.params.sscategorieId , // parent_id not foreignKey
      fournisseurId: req.params.fournisseurId,
      marqueId:req.params.marqueId,





  };
  //save bd
  Article.create(article,upload.single('image')   ).then(data => {
      console.log(data.id);
      const code={
        qte:req.body.qte,
        dateExpiration:req.body.dateExpiration,
        articleId:data.id
      }
      Code.create(code)
      stock={
        qteArticle:req.body.qte,
        stock_id:req.params.depotId,
        article_Id:data.id
      }
      
      Stock_article.create(stock)
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the article."
      });
  });

};

exports.findAllCode = (req, res) => {
  const id=req.params.id;
  Code.findAll(
    { where: {articleId: id}},
     {association:'code'})
     .then(data => {
      res.send(data);
  })
  .catch(err => {
       res.status(500).send({
      message: "some error occured while GET th article."+id
  });
});

}

exports.findById = (req, res) => {
    const id=req.params.id;

    Article.findByPk(id,{include: [
     
    { association: 'sscategorie' ,include:{association: 'sous-categorie',include:{ association: 'categorie'}} },
    { association :'fournisseur'},
  {association:'code'},
  {association:'marque'}]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while GET th article."+id
    });
});
};
exports.find = (req, res) => {
  const name=req.params.nomA

  Article.findOne(
   { where: {nomA: name}},

    { association: 'sscategorie' ,include:{association: 'sous-categorie',include:{ association: 'categorie'}} },
    { association :'fournisseur'},
    {association:'code'},
    {association:'marque'})
  .then(data => {
      res.send(data);
  })
  .catch(err => {
       res.status(500).send({
      message: "some error occured while creating th article."+id
  });
});
};


exports.update = (req, res) => {
    const id=req.params.id;
    const article={
      nomA:req.body.nomA,
      descriptionA:req.body.descriptionA,
      image:req.body.image,
      promotion: req.body.promotion,
      prixUnitaireInitial:req.body.prixUnitaireInitial,
      TVA: req.body.TVA,

      prixUnitairePromo: req.body.promotion==0 ?req.body.prixUnitaireInitial: (req.body.prixUnitaireInitial - (req.body.prixUnitaireInitial*req.body.promotion)/100 ) ,
      prixTTC: (req.body.prixUnitaireInitial+ (req.body.prixUnitaireInitial+req.body.TVA )/100),
      qte:req.body.qte,
      dateExpiration: req.body.dateExpiration,
      sscategorieId: req.body.sscategorieId , // parent_id not foreignKey
      fournisseurId: req.body.fournisseurId
// parent_id not foreignKey




  };
    Article.update(article, {
        where : {id : id }
  
    
    })
    .then(num => {
      const art = req.body
          
      console.log(art)
    
      const payload = JSON.stringify({
        title: 'Hello!',
        body: 'It works.',
      })
    
        if (num==1  ){
        
            
            res.send({
              message : "update article SUCESS!!!"
                        })   .catch(err => { 
              res.status(500).send({
              message: "error updated+notification"+id
            })
          })
         
          if (article.qte < 20 ){
          console.log(art.endpoint)
            webPush.sendNotification(art, payload)
              .then(result => console.log(result))
              .catch(e => console.log(e.stack))
            }
        
    
     } else { 
            res.send({
            message : ` cannot update article with id=${id}.Myabe...!`
        });
    }}
    ).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    Article.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "article was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete article with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.getQte=(req,res) =>{
  sequelize.query("SELECT sum(qte) as sum ,articles.id as id FROM `articles` ,codes where codes.articleId=articles.id group by articles.id").then(([results, metadata]) => {
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
exports.findAllByMagasin=(req,res) => {
    // include : [ {model: Article, through: 'stock_article', as: 'stock1',
    // include:[{ association: 'sscategorie' ,include:{association: 'sous-categorie',
    // include:{ association: 'categorie'}} },
    // { association :'fournisseur'},
    // {association:'marque'}],
    // }],
    // where: {stock_id: req.params.stockId}})
    sequelize.query("SELECT *, sa.id as idsa , a.id as ida, ssc.id as idssc , sc.id as idsc, f.id as idf, m.id as idm FROM stock_articles sa, articles a , stocks s , sscategories ssc , souscategories sc, categories c , fournisseurs f , marques m WHERE a.id=sa.article_Id and s.id=sa.stock_id and a.sscategorieId=ssc.id and sc.id=ssc.categorieSId and c.id=sc.categorieId and f.id=a.fournisseurId and m.id=a.marqueId and sa.stock_id like '"+req.params.stockId+"'").then(([results, metadata]) => {
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
exports.findAll= (req, res) => {
    Article.findAll( {include: [
        { association: 'sscategorie' ,include:{association: 'sous-categorie',include:{ association: 'categorie'}} },
        { association :'fournisseur'},
        { association : 'facture'},
        {association:'marque'},

    ]  })
      .then(data => {
       
        res.send(data);
    
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving articles."
        });
      });
  };
 
exports.deleteAll = (req, res) => {
  
};
