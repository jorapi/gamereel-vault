import React, { useState, useEffect } from 'react';

function Franchises() {
    const [franchises, setFranchises] = useState([]);
    const [newFranchise, setNewFranchise] = useState({ name: '', description: '' });

    useEffect(() => {
        fetch('http://localhost:3000/api/franchises')
            .then(response => response.json())
            .then(data => setFranchises(data))
            .catch(error => console.error('Error fetching franchises:', error));
    }, []);

    const handleChange = (e) => {
        setNewFranchise({ ...newFranchise, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/franchises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFranchise)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setFranchises([...franchises, data]);
            setNewFranchise({ name: '', description: '' }); // Reset form
        })
        .catch(error => console.error('Error adding franchise:', error));
    };

    return (
        <div>
            <h1>Franchises</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Franchise Name"
                    value={newFranchise.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newFranchise.description}
                    onChange={handleChange}
                />
                <button type="submit">Add Franchise</button>
            </form>
            <ul>
                {franchises.map(franchise => (
                    <li key={franchise.franchise_id}>{franchise.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Franchises;
