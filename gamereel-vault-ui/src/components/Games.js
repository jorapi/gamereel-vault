import React, { useState, useEffect } from 'react';

function Games() {
    const [games, setGames] = useState([]);
    const [franchises, setFranchises] = useState([]);
    const [newGame, setNewGame] = useState({ title: '', franchise_id: '', developer: '', publisher: '', genre: '' });

    useEffect(() => {
        // Fetch games
        fetch('http://localhost:3000/api/games')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error('Error fetching games:', error));

        // Fetch franchises
        fetch('http://localhost:3000/api/franchises')
            .then(response => response.json())
            .then(data => setFranchises(data))
            .catch(error => console.error('Error fetching franchises:', error));
    }, []);

    const handleChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGame)
        })
        .then(response => response.json())
        .then(data => {
            setGames([...games, data]);
            setNewGame({ title: '', franchise_id: '', developer: '', publisher: '', genre: '' }); // Reset form
        })
        .catch(error => console.error('Error adding game:', error));
    };

    return (
        <div>
            <h1>Games</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newGame.title}
                    onChange={handleChange}
                    required
                />
                <select
                    name="franchise_id"
                    value={newGame.franchise_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Franchise</option>
                    {franchises.map(franchise => (
                        <option key={franchise.franchise_id} value={franchise.franchise_id}>
                            {franchise.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="developer"
                    placeholder="Developer"
                    value={newGame.developer}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="publisher"
                    placeholder="Publisher"
                    value={newGame.publisher}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={newGame.genre}
                    onChange={handleChange}
                />
                <button type="submit">Add Game</button>
            </form>
            <ul>
                {games.map(game => (
                    <li key={game.game_id}>{game.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Games;
