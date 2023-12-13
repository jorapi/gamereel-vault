const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Ensure this path matches your project structure

// GET all hard drives
router.get('/', (req, res) => {
    const query = 'SELECT * FROM hard_drives';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving hard drives from database');
        } else {
            res.json(results);
        }
    });
});

// POST a new hard drive
router.post('/', (req, res) => {
    const { name, capacity, used_space, connection_type } = req.body;
    const query = 'INSERT INTO hard_drives (name, capacity, used_space, connection_type) VALUES (?, ?, ?, ?)';
    db.query(query, [name, capacity, used_space, connection_type], (err, results) => {
        if (err) {
            res.status(500).send('Error saving the hard drive');
        } else {
            res.status(201).send('Hard drive successfully added');
        }
    });
});

// GET a single hard drive by ID
router.get('/:id', (req, res) => {
    const hardDriveId = req.params.id;
    const query = 'SELECT * FROM hard_drives WHERE hard_drive_id = ?';
    db.query(query, [hardDriveId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving hard drive from database');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Hard drive not found');
            }
        }
    });
});

// PUT (update) a hard drive by ID
router.put('/:id', (req, res) => {
    const hardDriveId = req.params.id;
    const { name, capacity, used_space, connection_type } = req.body;
    const query = 'UPDATE hard_drives SET name = ?, capacity = ?, used_space = ?, connection_type = ? WHERE hard_drive_id = ?';
    db.query(query, [name, capacity, used_space, connection_type, hardDriveId], (err, results) => {
        if (err) {
            res.status(500).send('Error updating the hard drive');
        } else {
            res.send('Hard drive successfully updated');
        }
    });
});

// DELETE a hard drive by ID
router.delete('/:id', (req, res) => {
    const hardDriveId = req.params.id;
    const query = 'DELETE FROM hard_drives WHERE hard_drive_id = ?';
    db.query(query, [hardDriveId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting the hard drive');
        } else {
            res.send('Hard drive successfully deleted');
        }
    });
});

module.exports = router;
