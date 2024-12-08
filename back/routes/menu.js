const express=require("express");
const db=require("../connexion");
const routerMenu=express.Router();


// Route pour get Drinks
routerMenu.get('/getdrink', (req, res) => {
  try {
      const sql ="SELECT * FROM menu where type='drink';"
            db.query(sql,(err,result)=>{
          if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erreur lors de l acces aux menu", status: false });
           }
          else{
               return res.status(200).json({ 
                data:result,
                 status: true });
              }
              });

  } 
  catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Erreur du serveur",
          status: false
      });
  }
});



// Route pour get Food
routerMenu.get('/getfood', (req, res) => {
    try {
        const sql ="SELECT * FROM menu where type='food';"
              db.query(sql,(err,result)=>{
            if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur lors de l acces aux menu", status: false });
             }
            else{
                 return res.status(200).json({
                    data:result,
                   status: true });
                }
                });
  
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur du serveur",
            status: false
        });
    }
  });

module.exports = routerMenu;