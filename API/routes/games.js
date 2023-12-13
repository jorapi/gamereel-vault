const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust the path according to your project structure

// GET all games
router.get('/', (req, res) => {
    const query = 'SELECT * FROM games';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving games from database');
        } else {
            res.json(results);
        }
    });
});

// POST a new game
router.post('/', (req, res) => {
    const { title, franchise_id, release_date, developer, publisher, genre } = req.body;
    const query = 'INSERT INTO games (title, franchise_id, release_date, developer, publisher, genre) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, franchise_id, release_date, developer, publisher, genre], (err, results) => {
        if (err) {
            res.status(500).send('Error saving the game');
        } else {
            res.status(201).send('Game successfully added');
        }
    });
});

// GET a single game by ID
router.get('/:id', (req, res) => {
    const gameId = req.params.id;
    const query = 'SELECT * FROM games WHERE game_id = ?';
    db.query(query, [gameId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving game from database');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Game not found');
            }
        }
    });
});

// PUT (update) a game by ID
router.put('/:id', (req, res) => {
    const gameId = req.params.id;
    const { title, franchise_id, release_date, developer, publisher, genre } = req.body;
    const query = 'UPDATE games SET title = ?, franchise_id = ?, release_date = ?, developer = ?, publisher = ?, genre = ? WHERE game_id = ?';
    db.query(query, [title, franchise_id, release_date, developer, publisher, genre, gameId], (err, results) => {
        if (err) {
            res.status(500).send('Error updating the game');
        } else {
            res.send('Game successfully updated');
        }
    });
});

// DELETE a game by ID
router.delete('/:id', (req, res) => {
    const gameId = req.params.id;
    const query = 'DELETE FROM games WHERE game_id = ?';
    db.query(query, [gameId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting the game');
        } else {
            res.send('Game successfully deleted');
        }
    });
});

module.exports = router;
