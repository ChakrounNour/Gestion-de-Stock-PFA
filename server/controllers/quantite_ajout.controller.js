const { quantiter_ajouter } = require('../models');
const db = require('../models');
const quantite_ajout = db.quantiter_ajouter;


exports.create = (req, res) => {

  const qte_ajout={
      date:req.body.date,
      modalitePaiement:req.body.modalitePaiement,
      montant:req.body.montant,
      file: req.body.file,
      fournisseur_id:req.params.fournisseur_id,
      article_Id:req.params.article_Id
     
// parent_id not foreignKey




  };
  //save bd
  quantiter_ajouter.create(qte_ajout).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:
          err.message || "some error occured while creating the article."
      });
  });

};


exports.findOne = (req, res) => {
    const id=req.params.id;

    quantiter_ajouter.findByPk(id,
      { association :'facture'})
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
    const qte_ajout={
        date:req.body.date,
        modalitePaiement:req.body.modalitePaiement,
        montant:req.body.montant,
        file: req.body.file,
        article_Id : req.body.article_Id  , // parent_id not foreignKey
        fournisseur_id : req.body.fournisseur_id 
// parent_id not foreignKey




  };
  quantiter_ajouter.update(qte_ajout, {
        where : {id : id }
  
    
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "quantiter_ajouter was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update quantiter_ajouter with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    quantiter_ajouter.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "quantiter_ajouter was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete quantiter_ajouter with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.find = (req, res) => {
    const art=req.params.article_Id
    const four=req.params.fournisseur_id

  
    quantite_ajout.findOne(
     { where: {article_Id: art}, where: {fournisseur_id: four}})
     
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th article."+id
    });
  });
  };
exports.findAll= (req, res) => {
    quantiter_ajouter.findAll( {include: [     ]
      
    
    })
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
