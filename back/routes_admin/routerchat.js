const express = require('express');
const routerchat = express.Router();
const db = require('../connexion');  

routerchat.get('/chat/all', (req, res) => {

  const query = `
    SELECT * FROM chat
   ;
  `;
  
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des chats:', err);
      return res.status(500).json({ status: false, message: 'Erreur lors de la récupération des chats' });
    }

    db.query("SELECT COUNT(*) AS total FROM chat", (err, countResult) => {
      if (err) {
        console.error('Erreur lors du comptage des chats:', err);
        return res.status(500).json({ status: false, message: 'Erreur lors du comptage des chats' });
      }
      res.json({ 
        status: true, 
        data: result, 
      });
      //res.json({ status: true, data: result, total: countResult[0].total });
    });
  });
});


routerchat.post("/chat/add", (req, res) => {
  const name=req.body.name;
  const age=req.body.age;
  const type=req.body.type;
  const description=req.body.description;
  const image=req.body.image;
  const dop=req.body.dop;
  console.log(req.body);
  //const { name,age,type, description,image, dop } = req.body;
  const query = "INSERT INTO chat (nom,age, gender,description,image, dop) VALUES (?, ?,?,?,?,?)";
  db.query(query, [name,age,type, description, image,dop], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout du chat :", err);
      return res.status(500).json({ message: "Erreur lors de l'ajout du chat" });
    }

    res.status(201).json({status:true});
  });
});


routerchat.delete('/chat/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM chat WHERE id_chat = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du chat:', err);
      return res.status(500).json({ status: false, message: 'Erreur lors de la suppression du chat' });
    }

    if (result.affectedRows > 0) {
      res.json({ status: true, message: 'Chat supprimé avec succès' });
    } else {
      res.status(404).json({ status: false, message: 'Chat non trouvé' });
    }
  });
});


routerchat.put('/chat/update/:id', (req, res) => {
  const { id } = req.params;
  const { name,age,description,image,dop,type } = req.body;  
  db.query('UPDATE chat SET nom = ?,age=?,description=?,image=?,dop=?,gender=? WHERE id_chat = ?', [name,age,description,image,dop,type ,id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du chat:', err);
      return res.status(500).json({ status: false, message: 'Erreur lors de la mise à jour du chat' });
    }

    if (result.affectedRows > 0) {
      res.json({ status: true, message: 'Chat mis à jour avec succès' });
    } else {
      res.status(404).json({ status: false, message: 'Chat non trouvé' });
    }
  });
});

module.exports = routerchat;  