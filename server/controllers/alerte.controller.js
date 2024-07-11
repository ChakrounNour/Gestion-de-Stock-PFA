const db = require('../models');
const Alerte = db.Alerte;
const webpush = require('web-push')

const Article = db.Article;
const Code =db.Code ; 
const PUBLIC_VAPID_KEY='BB6cMxysKXG_Pt5OGP-ppPD1cP4_pkdF7uiel95TBD9bWJmtgq-DbEs-_zVSluMFgkojMGEqYC_fueouHnViZhg'
const PRIVATE_VAPID_KEY='8nN59y-zJjtjqgXqjcokyaiVBz5N4Cli3evxplW86XY'
const WEB_PUSH_CONTACT="mailto: contact@my-site.com"

webpush.setVapidDetails(WEB_PUSH_CONTACT, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)
exports.create = (req, res) => {
  
  const subscription = req.body
    var dateExpiration
    var qte
    var nomA
    var id
    var tempsEnMs = Date.now();
  console.log(tempsEnMs)
  console.log(subscription)

  Article.findAll()
  Code.findAll(
      { include : [ {association: 'codeart'}]})
        
  .then(data => {
      for ( valeur of data) {
       dateExpiration = valeur.dateExpiration
       qte=valeur.qte
       console.log(qte)
       id=valeur.id
       nomA=valeur.nomA

      const payload1 = JSON.stringify({
        title: "stock perime",
        body: "stock périmé! "+dateExpiration+ " date d'expiration pour l'article "+nomA ,
      })
      const payload2 = JSON.stringify({
        title: "stock epuise",
        body: "stock épuisé !Seulement"+qte+ " quantitié disponible pour l'article "+nomA ,
      })
      
        
        const alerte1={
          description:"stock périmé! "+dateExpiration+ " date d'expiration pour l'article "+nomA ,
          title:"stock perime"
         
        };
        const alerte2={
          description:"stock épuisé !Seulement"+qte+ " quantitié disponible pour l'article "+nomA ,
          title :"stock epuise"
        };
        

        //save bd
        Alerte.create(alerte1).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occured while creating the alerte."
            });
        });
      
        Alerte.create(alerte2).then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message:
              err.message || "some error occured while creating the alerte."
          });
      });
    

 
     if (qte<10){
        webpush.sendNotification(subscription, payload1)
        .then(result => console.log(result))
        .catch(e => console.log(e.stack))
    
      res.status(201).json({'success': true})
 
       }else if (dateExpiration<'2021-06-14'){
        webpush.sendNotification(subscription, payload2)
        .then(result => console.log(result))
        .catch(e => console.log(e.stack))
    
      res.status(202).json({'success': true})
 
       }

     }})

}


exports.findOne = (req, res) => {
    const id=req.params.id;

    Alerte.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th alerte."+id
    });
});
};


exports.delete = (req, res) => {
  const id=req.params.id;
  Alerte.destroy({
      where : {id : id }
  })
  .then(num => {
      if (num==1){
      res.send({
          message : "alerte was deleted successfully"
      });
  }else { 
          res.send({
          message : ' cannot delete alerte with id=${id}.Myabe...!'
      });
  }
  }).catch(err => { res.status(500).send({
      message: "error deleted"+id
  });
});
};
exports.findAll= (req, res) => {
    Alerte.findAll()
    
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving alerte."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
