const { quantite_commande } = require('../models');
const db = require('../models');
const Commande_article = db.quantiter_commander;
const Commande=db.Commande
const Article=db.Article
const sequelize=db.sequelize
exports.find = (req, res) => {
    const com=req.params.commande_Id

  
    Commande_article.findAll(
     { where: {commande_Id: com}})
     
    .then(data => {
        res.send(data);
    })
    .catch(err => {
         res.status(500).send({
        message: "some error occured while creating th Commande_article."+id
    });
  });
  };
 
exports.GetTabAdmin= (req, res) => {

    sequelize.query(" SELECT  a.id,nomA,image, SUM(prixTTC*qteC) vente ,sum(qteC) vendu ,CONVERT(((sum(qteC)*100)/sum(qte)), SIGNED INTEGER) as pourcentage FROM articles a , quantite_commandes q,codes c where q.article_Id=a.id and a.id=c.articleId GROUP BY a.id  ORDER BY vente DESC LIMIT 10").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
       
            
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
    
})}
exports.GetResumeByAdmin= (req, res) => {

    sequelize.query("select count(c.id) as count, sum(qteC*prixTTC) as vente ,avg(montant) as moyen  from commandes c, quantite_commandes q , articles  a where q.commande_Id=c.id and a.id=q.article_Id and q.date >= (CURDATE() - INTERVAL 1 MONTH)").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
       
            
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
    
})}
exports.GetPourcentageAdmin= (req, res) => {

    sequelize.query("select count(c.id) as count, sum(qteC*prixTTC) as vente,(CURDATE() - INTERVAL 2 MONTH) , (CURDATE() - INTERVAL 1 MONTH) ,avg(montant) as moyen from commandes c, quantite_commandes q , articles a where q.commande_Id=c.id and a.id=q.article_Id and q.date BETWEEN (CURDATE() - INTERVAL 2 MONTH) and (CURDATE() - INTERVAL 1 MONTH)").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
       
            
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
    
})}
exports.GetResumeByResp= (req, res) => {

    sequelize.query("select count(c.id) as count, sum(qteC*prixTTC) as vente ,avg(montant) as moyen,(CURDATE() - INTERVAL 1 MONTH) from commandes c, quantite_commandes q , articles a, stocks s,stock_articles s_a where a.id=s_a.article_Id and s.id=s_a.stock_id and q.commande_Id=c.id and a.id=q.article_Id and q.date >= (CURDATE() - INTERVAL 1 MONTH) and s.id='"+req.params.magasin_id+"' GROUP by s.id").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
       
            
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
    
})}
exports.GetPourcentageResp= (req, res) => {

    sequelize.query("select count(c.id) as count, sum(qteC*prixTTC) as vente, (CURDATE() - INTERVAL 2 MONTH) , (CURDATE() - INTERVAL 1 MONTH)  ,avg(montant) as moyen from commandes c, quantite_commandes q , articles a, stocks s,stock_articles s_a where a.id=s_a.article_Id and s.id=s_a.stock_id and q.commande_Id=c.id and a.id=q.article_Id and q.date BETWEEN (CURDATE() - INTERVAL 2 MONTH) and (CURDATE() - INTERVAL 1 MONTH) and s.id='"+req.params.magasin_id+"'  GROUP by s.id    ").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
       
            
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
    
})}

exports.GetTabRespon= (req, res) => {

    sequelize.query(" SELECT a.id,nomA,image, SUM(prixTTC*qteC) vente ,sum(qteC) vendu ,CONVERT(((sum(qteC)*100)/sum(qte)), SIGNED INTEGER) as pourcentage FROM articles a , quantite_commandes q,codes c ,stock_articles s_a, stocks s where q.article_Id=a.id and a.id=c.articleId and a.id=s_a.article_Id and s.id=s_a.stock_id and s.id='"+req.params.magasin_id+"' GROUP BY a.id ORDER BY vente DESC LIMIT 10    ").then(([results, metadata]) => {
        console.log(results)
        res.send(results)
       
            
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating th rapport."
        });
    });
    
})}