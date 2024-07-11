const db = require('../models');
const sequelize=db.sequelize
exports.createFournisseur = (req, res) => {
    const fs=require('fs')
    let fichier=fs.readFileSync('./detected_images/ocr.json')
    let data= JSON.parse(fichier)

    for (d in data) {

        if (d=="data")
            // console.log(data[d])
            for (valeur in data[d]) {
                // console.log(valeur)
                // console.log(data[d][valeur])
                var nomSTE=data[d][valeur]["nomSTE"]
                var adresseSTE=data[d][valeur]["adresseSTE"]
                var emailSTE=data[d][valeur]["emailSTE"]
                var telSTE=data[d][valeur]["telSTE"]
                var cin=data[d][valeur]["cin"]
                var nomCli=data[d][valeur]["nomCli"]
                var prenomCli=data[d][valeur]["prenomCli"]
                var adresseCli=data[d][valeur]["adresseCli"]
                var numTel=data[d][valeur]["numTel"]
                var dateFact=data[d][valeur]["dateFact"]
                var codeArt=data[d][valeur]["codeArt"]
                var desgArt=data[d][valeur]["desgArt"]
                var qte=data[d][valeur]["qte"]
                var commande=data[d][valeur]["commande"]
                var prixUT=data[d][valeur]["prixUT"]
                var TVA=data[d][valeur]["TVA"]
                var Remise=data[d][valeur]["Remise"]
                var modeLiv=data[d][valeur]["modeLiv"]
                var dateLiv=data[d][valeur]["dateLiv"]
                var montantHT=data[d][valeur]["montantHT"]
                var montantTTC=data[d][valeur]["montantTTC"]
                var totalHT=data[d][valeur]["totalHT"]
                var timbre=data[d][valeur]["timbre"]
                var totalTVA=data[d][valeur]["totalTVA"]
                var numFact=data[d][valeur]["numFact"]
                var fournisseur_id=0,article_id=0
                console.log(nomSTE,adresseSTE,emailSTE)
                // for (valeur2 in data[d][valeur]) {
                //     console.log(valeur2)
                //     console.log(data[d][valeur][valeur2])
                    sequelize.query("INSERT INTO `fournisseurs` (`nomF`, `adresseF`,`emailF`,`telF`) VALUES('"+nomSTE+"' , '"+adresseSTE+"','"+emailSTE+"','"+telSTE+"'); ").then(([results, metadata]) => {
                        console.log("fournisseur")
                        fournisseur_id=results
                        console.log(results)
                        })
            
                    sequelize.query("INSERT INTO `clients` (`cinCli`, `nomCli`,`prenomCli`,`telCli`,`adresseCli`) VALUES('"+cin+"' ,'"+nomCli+"' , '"+prenomCli+"','"+numTel+"','"+adresseCli+"'); ").then(([results, metadata]) => {
                          })  

                   sequelize.query("INSERT INTO `articles` (`id`, `descriptionA`,`prixUnitaireInitial`,`promotion`,`TVA`) VALUES('"+codeArt+"' ,'"+desgArt+"' ,'"+prixUT+"','"+Remise+"','"+TVA+"'); ").then(([results, metadata]) => {
                    console.log("article"+results)
                    article_id=results
                    console.log(results)
                    console.log("article_id"+article_id)
                    sequelize.query("INSERT INTO `quantite_ajouts` (id,date	,qteC,totalHT,montantTTC,montantHT,timbre,totalTVA,dateLiv,modeLiv,article_Id,fournisseur_id) VALUES('"+numFact+"','"+dateFact+"','"+qte+"' ,'"+totalHT+"' ,'"+montantTTC+"','"+montantHT+"','"+timbre+"' ,'"+totalTVA+"' ,'"+dateLiv+"','"+modeLiv+"','"+article_id+"','"+fournisseur_id+"'); ").then(([results, metadata]) => {
                        console.log(results)
               })     
                          })
                //    sequelize.query("INSERT INTO `commandes` (id,qteC) VALUES('"+commande+"' ,'' ,'"+qte+"'); ").then(([results, metadata]) => {
                //             console.log(results)
                //    }) 
                  
            }
    }

    res.status(500).send({
        message:
         "Facture fournisseur ajoutée avec succès"
    });
};

exports.createClient = (req, res) => {
    const fs=require('fs')
    let fichier=fs.readFileSync('./detected_images/ocr.json')
    let data= JSON.parse(fichier)

    for (d in data) {

        if (d=="data")
            // console.log(data[d])
            for (valeur in data[d]) {
                // console.log(valeur)
                // console.log(data[d][valeur])
                var nomSTE=data[d][valeur]["nomSTE"]
                var adresseSTE=data[d][valeur]["adresseSTE"]
                var emailSTE=data[d][valeur]["emailSTE"]
                var telSTE=data[d][valeur]["telSTE"]
                var cin=data[d][valeur]["cin"]
                var nomCli=data[d][valeur]["nomCli"]
                var prenomCli=data[d][valeur]["prenomCli"]
                var adresseCli=data[d][valeur]["adresseCli"]
                var numTel=data[d][valeur]["numTel"]
                var dateFact=data[d][valeur]["dateFact"]
                var codeArt=data[d][valeur]["codeArt"]
                var nomArt=data[d][valeur]["nomArt"]
                var desgArt=data[d][valeur]["desgArt"]
                var qte=data[d][valeur]["qte"]
                var commande=data[d][valeur]["commande"]
                var prixUT=data[d][valeur]["prixUT"]
                var TVA=data[d][valeur]["TVA"]
                var Remise=data[d][valeur]["Remise"]
                var modeLiv=data[d][valeur]["modeLiv"]
                var dateLiv=data[d][valeur]["dateLiv"]
                var montantHT=data[d][valeur]["montantHT"]
                var montantTTC=data[d][valeur]["montantTTC"]
                var totalHT=data[d][valeur]["totalHT"]
                var timbre=data[d][valeur]["timbre"]
                var totalTVA=data[d][valeur]["totalTVA"]
                var numFact=data[d][valeur]["numFact"]
                var dateC=data[d][valeur]["dateC"]
                var fournisseur_id=0,article_id=0 ,client_id=0,commande_id=0
                
                    sequelize.query("INSERT INTO `fournisseurs` (`nomF`, `adresseF`,`emailF`,`telF`) VALUES('"+nomSTE+"' , '"+adresseSTE+"','"+emailSTE+"','"+telSTE+"'); ").then(([results, metadata]) => {
                        console.log("fournisseur")
                        fournisseur_id=results
                        console.log(results)
                        })
            
                    sequelize.query("INSERT INTO `clients` (`cinCli`, `nomCli`,`prenomCli`,`telCli`,`adresseCli`) VALUES('"+cin+"' ,'"+nomCli+"' , '"+prenomCli+"','"+numTel+"','"+adresseCli+"'); ").then(([results, metadata]) => {
                        client_id=results    
                    })  

                   sequelize.query("INSERT INTO `articles` (`id`,`nomA`, `descriptionA`,`prixUnitaireInitial`,`promotion`,`TVA`) VALUES('"+codeArt+"','"+nomArt+"' ,'"+desgArt+"' ,'"+prixUT+"','"+Remise+"','"+TVA+"'); ").then(([results, metadata]) => {
                    article_id=results
                    
                    sequelize.query("INSERT INTO `commandes` (id,dateC,client_Id) VALUES('"+commande+"' ,'"+dateC+"' , '"+client_id+"'); ").then(([results, metadata]) => {
                    commande_id=results
                    sequelize.query("INSERT INTO `quantite_commandes` (id,date	,qteC,totalHT,montantTTC,montantHT,timbre,totalTVA,dateLiv,modeLiv,commande_Id,article_Id	) VALUES('"+numFact+"','"+dateFact+"','"+qte+"' ,'"+totalHT+"' ,'"+montantTTC+"','"+montantHT+"','"+timbre+"' ,'"+totalTVA+"' ,'"+dateLiv+"','"+modeLiv+"','"+commande_id+"','"+article_id+"'); ").then(([results, metadata]) => {
                        console.log(results)
                    })     
                    })  
                  
                    })
                              
            }
    }
    res.status(500).send({
        message:
         "Facture client ajoutée avec succès"
    });

};

