const express = require('express');
const routerclient = express.Router();
const db = require('../connexion');
routerclient.get("/all", (req, res) => {
    db.query("SELECT *,personne.id as ID FROM user,personne where personne.id=user.id", (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des clients:', err);
            return res.status(500).json({ status: false, message: 'Erreur lors de la récupération des clients ' });
        }

        if (result.length === 0) {
            return res.status(404).json({ status: false, message: 'Aucune client trouvé' });
        }

        res.json({ status: true, data: result });
    });
});


routerclient.delete('/delete/:id_client', (req, res) => {
    const id  = req.params.id_client;
    console.log(id)
    db.query('DELETE FROM personne WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du client:', err);
            return res.status(500).json({ status: false, message: 'Erreur lors de la suppression du client' });
        }

        if (result.affectedRows > 0) {
            res.json({ status: true, message: 'client supprimée avec succès' });
        } else {
            res.status(404).json({ status: false, message: 'client non trouvée' });
        }
    });
});

module.exports = routerclient;
