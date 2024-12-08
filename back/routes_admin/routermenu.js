const express = require("express");
const db = require('../connexion');
const routermenu = express.Router();

routermenu.get("/menu/all", (req, res) => {
  const sql ="SELECT * FROM menu ;"
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
});

// Ajouter un menu
routermenu.post("/menu/add", (req, res) => {
  const { name, type, price,image } = req.body;
  const query = "INSERT INTO Menu (nom_menu,type, prix,image) VALUES (?, ?,?,?)";
  db.query(query, [name, type, price,image], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout du menu :", err);
      return res.status(500).json({ message: "Erreur lors de l'ajout du menu" });
    }

    res.status(201).json({status:true});
  });
});

// Mettre à jour un menu
routermenu.put("/menu/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, type, price,image } = req.body;
  const query = "UPDATE menu SET nom_menu = ?, type= ?, prix = ?,image=? WHERE id_menu = ?";
  db.query(query, [name, type, price,image, id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du menu :", err);
      return res.status(500).json({ message: "Erreur lors de la mise à jour du menu" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.json({status:true});
  });
});

// Supprimer un menu
routermenu.delete("/menu/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM menu WHERE id_menu = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression du menu :", err);
      return res.status(500).json({ message: "Erreur lors de la suppression du menu" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.json({ message: "Menu supprimé avec succès", status:true });
  });
});

module.exports=routermenu;


