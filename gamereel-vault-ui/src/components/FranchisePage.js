import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Moment from 'moment';
import FranchiseFormDialog from './FranchiseFormDialog'; 

// Franchise Table Component
const FranchiseTable = ({ onFranchiseSelect }) => {
    const [franchises, setFranchises] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingFranchise, setEditingFranchise] = useState(null);

    const handleOpenDialog = (franchise) => {
        setEditingFranchise(franchise);
        setOpenDialog(true);
    };

    const handleSaveFranchise = (franchiseData) => {
        if (editingFranchise) {
            // Update existing franchise logic
        } else {
            // Add new franchise logic
        }
        // After saving, refresh the franchises data
        // ...
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/franchises')
            .then(response => response.json())
            .then(data => setFranchises(data))
            .catch(error => console.error('Error fetching franchises:', error));
    }, []);

    return (
        <>
            <Button onClick={() => handleOpenDialog(null)}>Add Franchise</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Franchise</TableCell>
                            <TableCell align="right">Drives Covered</TableCell>
                            <TableCell align="right">Total Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {franchises.map((franchise) => (
                            <TableRow key={franchise.franchise_id} onClick={() => onFranchiseSelect(franchise)}>
                                <TableCell component="th" scope="row">
                                    {franchise.name}
                                </TableCell>
                                <TableCell align="right">{franchise.drivesCovered}</TableCell>
                                <TableCell align="right">{franchise.totalSize}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><FranchiseFormDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                franchise={editingFranchise}
                onSave={handleSaveFranchise} />
        </>
    );
};

const fetchGamesForFranchise = async (franchiseId) => {
    try {
        // Construct the URL for the API endpoint
        const url = `http://localhost:3000/api/franchises/${franchiseId}/games`;

        // Make the HTTP request to the API
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const games = await response.json();

        return games;
    } catch (error) {
        console.error("Fetching games failed:", error);
        return []; // Return an empty array in case of an error
    }
};


const GamesTable = ({ franchise, onGameSelect }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGamesForFranchise(franchise.franchise_id).then(setGames);
    }, [franchise]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Game Title</TableCell>
                            <TableCell align="right">Release Date</TableCell>
                            <TableCell align="right">Developer</TableCell>
                            <TableCell align="right">Publisher</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map((game) => (
                            <TableRow key={game.game_id} onClick={() => onGameSelect(game)}>
                                <TableCell component="th" scope="row">
                                    {game.title}
                                </TableCell>
                                <TableCell align="right">{Moment(game.release_date).format('L')}</TableCell>
                                <TableCell align="right">{game.developer}</TableCell>
                                <TableCell align="right">{game.publisher}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

const fetchFilesForGame = async (gameId) => {
    try {
        // Construct the URL for the API endpoint
        const url = `http://localhost:3000/api/games/${gameId}/files`;

        // Make the HTTP request to the API
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const files = await response.json();

        return files;
    } catch (error) {
        console.error("Fetching files failed:", error);
        return []; // Return an empty array in case of an error
    }
};

const FilesTable = ({ game }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFilesForGame(game.game_id).then(setFiles);
    }, [game]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell align="right">Size</TableCell>
                        <TableCell align="right">Format</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow key={file.file_id}>
                            <TableCell component="th" scope="row">
                                {file.name}
                            </TableCell>
                            <TableCell align="right">{file.size}</TableCell>
                            <TableCell align="right">{file.format}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// Main Page Component
const FranchisePage = () => {
    const [selectedFranchise, setSelectedFranchise] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);

    const handleBack = () => {
        if (selectedGame) {
            setSelectedGame(null);
        } else if (selectedFranchise) {
            setSelectedFranchise(null);
        }
    };

    return (
        <div>
            <Button onClick={handleBack}>Back</Button>
            {selectedGame ? (
                <FilesTable game={selectedGame} />
            ) : selectedFranchise ? (
                <GamesTable franchise={selectedFranchise} onGameSelect={setSelectedGame} />
            ) : (
                <FranchiseTable onFranchiseSelect={setSelectedFranchise} />
            )}
        </div>
    );
};

export default FranchisePage;
