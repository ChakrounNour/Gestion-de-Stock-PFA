const db = require('../models');
const Depot = db.Stock;
const Article=db.Article
const depot_article=db.stock_article
//const Op = db.Sequelize.Op;
const sequelize=db.sequelize

exports.create = (req, res) => {
  if (!req.body.nom){
      res.status(400).send({
          message: "content can not be empty"
      });
      return;
  }
  const depot={
      nom:req.body.nom,
      adresseLocal:req.body.adresseLocal,
      label:"Depot",
      zoneId:req.params.zoneId,
      userId:req.params.userId




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

    Depot.findByPk(id,   {
        
        include : [{association : 'zone'},{ association: 'user' }, 
        {model: Article,  include:[{ association:'code'},{ association:'marque'}],
           through: 'stock_article', as: 'stock1'}]

   
    }
)
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
exports.GetDepot= (req, res) => {
   
   /* userId=req.params.userId;
    Depot.findAll(  
            {   include : [{association : 'zone'},{ association: 'user' }, 
            {model: Article, include:[{ association:'code'},{ association:'marque'}]
                   ,through: 'stock_article', as: 'stock1'}]
               ,
                where : {label : "Depot",userId :userId  }
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
      });*/
      userId=req.params.userId;
      sequelize.query("SELECT * FROM `users` u , stocks s, stock_users s_u where s.id=s_u.stock_id and u.id=s_u.user_Id and s.label like 'Depot' and s_u.user_Id like '"+userId+"' "
    ,{ replacements: ['active'], type: sequelize.QueryTypes.SELECT }
  ).then(function(projects) {
    res.send(projects)
  })
  };
exports.findAll= (req, res) => {
    /*
    Depot.findAll({
        
        include : [ {association : 'zone'},
        {model: Article, include:[{ association:'marque'}], 
           through: 'stock_article', as: 'stock1'}]

    
    ,
        where : {label : "Depot" }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving depots."
        });
      });*/
   
     
  };
exports.deleteAll = (req, res) => {
  
};
