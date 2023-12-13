const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust this path to match your project structure

// GET all video files
router.get('/', (req, res) => {
    const query = 'SELECT * FROM video_files';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving video files from database');
        } else {
            res.json(results);
        }
    });
});

// POST a new video file
router.post('/', (req, res) => {
    const { game_id, hard_drive_id, file_name, file_path, file_size, duration, resolution, date_recorded, file_format } = req.body;
    const query = 'INSERT INTO video_files (game_id, hard_drive_id, file_name, file_path, file_size, duration, resolution, date_recorded, file_format) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [game_id, hard_drive_id, file_name, file_path, file_size, duration, resolution, date_recorded, file_format], (err, results) => {
        if (err) {
            res.status(500).send('Error saving the video file');
        } else {
            res.status(201).send('Video file successfully added');
        }
    });
});

// GET a single video file by ID
router.get('/:id', (req, res) => {
    const fileId = req.params.id;
    const query = 'SELECT * FROM video_files WHERE file_id = ?';
    db.query(query, [fileId], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving video file from database');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Video file not found');
            }
        }
    });
});

// PUT (update) a video file by ID
router.put('/:id', (req, res) => {
    const fileId = req.params.id;
    const { game_id, hard_drive_id, file_name, file_path, file_size, duration, resolution, date_recorded, file_format } = req.body;
    const query = 'UPDATE video_files SET game_id = ?, hard_drive_id = ?, file_name = ?, file_path = ?, file_size = ?, duration = ?, resolution = ?, date_recorded = ?, file_format = ? WHERE file_id = ?';
    db.query(query, [game_id, hard_drive_id, file_name, file_path, file_size, duration, resolution, date_recorded, file_format, fileId], (err, results) => {
        if (err) {
            res.status(500).send('Error updating the video file');
        } else {
            res.send('Video file successfully updated');
        }
    });
});

// DELETE a video file by ID
router.delete('/:id', (req, res) => {
    const fileId = req.params.id;
    const query = 'DELETE FROM video_files WHERE file_id = ?';
    db.query(query, [fileId], (err, results) => {
        if (err) {
            res.status(500).send('Error deleting the video file');
        } else {
            res.send('Video file successfully deleted');
        }
    });
});

module.exports = router;
