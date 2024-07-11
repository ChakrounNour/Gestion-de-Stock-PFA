
require('rootpath')();
const fs = require("fs");
const path = require("path");

const yolo = require("./yolo");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const imageRoute = require('./routes/images');
var ejwt = require('express-jwt');
const config2 = require('config2.json');
const webpush = require('web-push')
PUBLIC_VAPID_KEY="BNEN-bqy7t8lcpsLROC5SoDPRuQi6YjyZ-YhW_60UDqRsiK83KD4BjxNM--ZrwhHEqZ40zYgCHoohQsXxjj4hLM"
PRIVATE_VAPID_KEY="VfcQFgaOreANbv5LYtyvPcbHJ6i9yNdHJeGAS-h-GnI"
WEB_PUSH_CONTACT="mailto: contact@my-site.com"
webpush.setVapidDetails(WEB_PUSH_CONTACT, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)
const server = require("http").createServer();
server.on("request", app);
var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 ,
}
app.use(express.static(__dirname + './controllers/uploads'));
app.use("/uploads", express.static(__dirname + '/controllers/uploads'));
app.get('/my/pdf', function (req, res) {
  var doc = new Pdf();
  doc.text("Hello World", 50, 50);

  doc.output( function(pdf) {
      res.type('application/pdf');
      res.end(pdf, 'binary');
  });
});

const PATH_TO_ORIGINAL_IMAGES = "original_images";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/images", (req, res) => {
  fs.readdir(`${__dirname}\\${PATH_TO_ORIGINAL_IMAGES}`, (err, images) => {
    if (err) console.log(err);
    res.json(images);
    res.status(200);
  });
});

app.get("/images/:image", (req, res) => {
  res.sendFile(`${__dirname}/${PATH_TO_ORIGINAL_IMAGES}/${req.params.image}`);
});

app.get("/detect/:image", async (req, res) => {
  try {
    let pathToDetectedImage = await yolo(req.params.image);
    res.sendFile(pathToDetectedImage);
  } catch (error) {
    console.log(error);
  }
});

app.use(cors(corsOptions));
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

const db = require("./models");
db.sequelize.sync();
// api routes
app.use('/users', require('./users/users.controller'));

  app.use("/images", imageRoute);
  app.post('/notifications/subscribe', (req, res) => {
    const subscription = req.body
  
    console.log(subscription)
  
    var dateExpiration
    var qte
    var id
    var tempsEnMs = Date.now();
  console.log(tempsEnMs)
  console.log(subscription)
  
  
  Article.findAll()
        
  .then(data => {
      for ( valeur of data) {
        dateExpiration = valeur.dateExpiration
       qte=valeur.qte
       console.log(qte)
       id=valeur.id
       const payload = JSON.stringify({
        title: 'Probleme!',
        body: 'il ya une probleme quanttié ou date expiration dans '+id,
      })
      const payload1 = JSON.stringify({
        title: 'Quantite!',
        body: 'il ya une quanttié < 10 dans '+id,
      })
      const payload2 = JSON.stringify({
        title: 'date d expiration!',
        body: 'il ya une date expiration dans '+id,
      })
       if (qte<10 || dateExpiration<'2021-06-14'){
        webpush.sendNotification(subscription, payload)
        .then(result => console.log(result))
        .catch(e => console.log(e.stack))
    
      res.status(200).json({'success': true})
   
        
        const alerte={
          description:"il ya une quanttié < 10 dans "+id,
          dateAl:"18-05-2021"
         
        };
        //save bd
        Alerte.create(alerte).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "some error occured while creating the alerte."
            });
        });
  
  
  
       } else if (qte<10){
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
  
  })
  
  
// global error handler
app.use(errorHandler);

require("./routes/client.routes")(app);
require("./routes/magasin.routes")(app);
require("./routes/articles.routes")(app);
require("./routes/categorie.routes")(app);
require("./routes/scategorie.routes")(app);
require("./routes/sscategorie.routes")(app);
require("./routes/fournisseur.routes")(app);
require("./routes/quantite_ajout.routes")(app);
require("./routes/quantite_commander.routes")(app);
require("./routes/commande.routes")(app);
require("./routes/inventaire.routes")(app);
require("./routes/resume.routes")(app);
require("./routes/code.routes")(app);
require("./routes/inventaire_article.routes")(app);
require("./routes/depot.routes")(app);
require("./routes/depot_article.routes")(app);
require("./routes/alerte.routes")(app);
require("./routes/statistique.routes")(app);
require("./routes/stock_user.routes")(app);
require("./routes/marques.routes")(app);
require("./routes/zone.routes")(app);
require("./routes/code.routes")(app);
require("./routes/uploadFacture.routes")(app);


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 81) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));