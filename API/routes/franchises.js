const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust the path according to your project structure

// GET all franchises
router.get('/', (req, res) => {
    const query = 'SELECT * FROM franchises';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving franchises from database');
        } else {
            res.json(results);
        }
    });
});

// GET games for a specific franchise
router.get('/:franchiseId/games', (req, res) => {
    const franchiseId = req.params.franchiseId;
    const query = 'SELECT * FROM games WHERE franchise_id = ?'; // Adjust this query based on your database schema

    db.query(query, [franchiseId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving games from database');
        } else {
            res.json(results);
        }
    });
});

// POST a new franchise
router.post('/', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO franchises (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, results) => {
        if (err) {
            res.status(500).send('Error saving the franchise');
        } else {
            res.status(201).send('Franchise successfully added');
        }
    });
});

// GET a single franchise by ID
router.get('/:id', (req, res) => {
    const franchiseId = req.params.id;
    const query = 'SELECT * FROM franchises WHERE franchise_id = ?';
    db.query(query, [franchiseId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving franchise from database');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Franchise not found');
            }
        }
    });
});

// PUT (update) a franchise by ID
router.put('/:id', (req, res) => {
    const franchiseId = req.params.id;
    const { name, description } = req.body;
    const query = 'UPDATE franchises SET name = ?, description = ? WHERE franchise_id = ?';
    db.query(query, [name, description, franchiseId], (err, results) => {
        if (err) {
            res.status(500).send('Error updating the franchise');
        } else {
            res.send('Franchise successfully updated');
        }
    });
});

// DELETE a franchise by ID
router.delete('/:id', (req, res) => {
    const franchiseId = req.params.id;
    const query = 'DELETE FROM franchises WHERE franchise_id = ?';
    db.query(query, [franchiseId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting the franchise');
        } else {
            res.send('Franchise successfully deleted');
        }
    });
});

module.exports = router;
