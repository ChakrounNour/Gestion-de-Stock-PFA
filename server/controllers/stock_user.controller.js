const { checkPreferences } = require('joi');
const db = require('../models');
const User=db.User;
const Stock = db.Stock;
const User_Stock=db.stock_user;
exports.create = (req, res) => {
              const user_stock={
                user_Id:req.params.user_Id,
                stock_id :req.params.stock_id ,
                             
            };
          
              User_Stock.create(user_stock).then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message:
                    err.message || "some error occured while creating the user/stock."
                });
            });
      
      
        

   

};

exports.update = (req, res) => {
    const id=req.params.id;
    Stock_user.update(req.body, {
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Stock_user was updated successfully"
        });}
        else { 
            res.send({
            message : ` cannot update Stock_user with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error updated"+id
    });
});
};

exports.delete = (req, res) => {
    const id=req.params.id;
    User_Stock.destroy({
        where : {id : id }
    })
    .then(num => {
        if (num==1){
        res.send({
            message : "Stock_user was deleted successfully"
        });
    }else { 
            res.send({
            message : ` cannot delete Stock_user with id=${id}.Myabe...!`
        });
    }
    }).catch(err => { res.status(500).send({
        message: "error deleted"+id
    });
});
};
exports.findAll= (req, res) => {
   

    User_Stock.findAll({
      
     
        }  
    )
      .then(data => {

        res.send(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Inventaire."
        });
      });
  };
exports.deleteAll = (req, res) => {
  
};
