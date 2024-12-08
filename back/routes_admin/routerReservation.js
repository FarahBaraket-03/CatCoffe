const express = require('express');
const routerReservation = express.Router();
const db = require('../connexion');

routerReservation.get("/all", (req, res) => {
    db.query("SELECT * FROM reservation", (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des réservations:', err);
            return res.status(500).json({ status: false, message: 'Erreur lors de la récupération des rreservation' });
        }

        if (result.length === 0) {
            return res.status(404).json({ status: false, message: 'Aucune client trouvé' });
        }

        res.json({ status: true, data: result });
    });
});


routerReservation.delete('/delete/:id_res', (req, res) => {
    const { id_res } = req.params;
    db.query('DELETE FROM reservation WHERE id_res = ?', [id_res], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la réservation:', err);
            return res.status(500).json({ status: false, message: 'Erreur lors de la suppression de la réservation' });
        }

        if (result.affectedRows > 0) {
            res.json({ status: true, message: 'Réservation supprimée avec succès' });
        } else {
            res.status(404).json({ status: false, message: 'Réservation non trouvée' });
        }
    });
});

module.exports = routerReservation;
