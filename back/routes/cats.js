const express=require("express");
const db=require("../connexion");
const routerCats=express.Router();


// calcul nb of cats
routerCats.get('/getnbchat', (req, res) => {
    try {
        const sql ="SELECT count(*) as nb from chat ;"
              db.query(sql,(err,result)=>{
            if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur ", status: false });
             }
            else{ 
                 return res.status(200).json({ message:result[0].nb, status: true });
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


// get all information of cats
routerCats.get("/all", (req, res) => {
    const query = "SELECT * FROM chat";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        return res.json(results);
    });
});




module.exports = routerCats;