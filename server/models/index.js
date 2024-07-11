const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Client = require("./client.model.js")(sequelize, Sequelize);
db.Fournisseur = require("./fournisseur.model.js")(sequelize, Sequelize);
db.User = require("../users/user.model.js")(sequelize, Sequelize);
db.Categorie = require("./categorie.model.js")(sequelize, Sequelize);
db.Article = require("./article.model.js")(sequelize, Sequelize);
db.Commande = require("./commande.model.js")(sequelize, Sequelize);
db.Alerte = require("./alerte.model.js")(sequelize, Sequelize);
db.Stock = require("./stock_depot_magasin.model.js")(sequelize, Sequelize);
db.stock_article = require("./stock_article.model.js")(sequelize, Sequelize);
db.Marque = require("./marque.model.js")(sequelize, Sequelize);
db.Inventaire = require("./inventaire.model.js")(sequelize, Sequelize);
db.SousCategorie = require("./Sous-Categorie.model.js")(sequelize, Sequelize);
db.SSCategorie= require("./SSCategorie.model.js")(sequelize, Sequelize);
db.quantiter_ajouter= require("./quantiteAjouter.model.js")(sequelize, Sequelize);
db.quantiter_commander= require("./quantiteCommander.model.js")(sequelize, Sequelize);
db.inventaire_article= require("./inventaire_article.model.js")(sequelize, Sequelize);
db.Zone= require("./zone.model.js")(sequelize, Sequelize);
db.Code = require("./code.model.js")(sequelize, Sequelize);
db.stock_user= require("./stock_user.model.js")(sequelize, Sequelize);

// code d'article
db.Code.belongsTo(db.Article, {
  foreignKey: "articleId",
  as: "codeart",
});

// marque d'article
db.Article.belongsTo(db.Marque, {
  foreignKey: "marqueId",
  as: "marque",
});
// zone de magasin ou depot
db.Stock.belongsTo(db.Zone, {
  foreignKey: "zoneId",
  as: "zone",
});
//magasin ou depot
db.Stock.belongsToMany(db.User, {
  through: 'stock_user',
  as: "stockUser",
  foreignKey: "stock_id",
  otherKey: 'user_Id',
});

//article
db.Article.belongsTo(db.SSCategorie, {
  foreignKey: "sscategorieId",
  as: "sscategorie",
});

db.SSCategorie.belongsTo(db.SousCategorie, {
  foreignKey: "categorieSId",
  as: "sous-categorie",
});

db.SousCategorie.belongsTo(db.Categorie, {
  foreignKey: "categorieId",
  as: "categorie",
});

db.Article.belongsTo(db.Fournisseur, {
  foreignKey: "fournisseurId",
  as: "fournisseur",
});
//facture_fournisseur
db.Article.belongsToMany(db.Fournisseur, {
  through: 'quantite_ajout',
  as: "facture",
  foreignKey: "article_Id",
  otherKey: 'fournisseur_id',


});

//facture_client
db.Commande.belongsToMany(db.Article, {
  through: 'quantite_commande',
  as: "factureClient",
  foreignKey: "commande_Id",
  otherKey:"article_Id" 
});

db.Commande.belongsTo(db.Client, {
  foreignKey: "client_Id",
  as: "client",
});
db.Stock.belongsToMany(db.Article, {
  through: 'stock_article',
  as: "stock1",
  foreignKey: "stock_id",

});
db.Article.belongsToMany(db.Stock, {
  through: 'stock_article',
  as: "stock_art",
  foreignKey: "article_Id",

});

//alerte
db.Alerte.belongsTo(db.Article, {
  foreignKey: "article_Id",
  as: "article_alerte",
});



//inventaire
db.Inventaire.belongsToMany(db.Article, {
  through: 'inventaire_article',
  as: "inventaire_art",
  foreignKey: "inventaire_Id",

});
db.Article.belongsToMany(db.Inventaire, {
  through: 'inventaire_article',
  as: "inventaire_art2",
  foreignKey: "article_Id",

});



module.exports = db;