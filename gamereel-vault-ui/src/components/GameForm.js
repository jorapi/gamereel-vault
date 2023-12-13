// src/components/GameForm.js
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function GameForm({ onSubmit, gameData, setGameData, franchises }) {
  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Title"
        name="title"
        value={gameData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Other fields */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Franchise</InputLabel>
        <Select
          name="franchise_id"
          value={gameData.franchise_id}
          onChange={handleChange}
        >
          {franchises.map((franchise) => (
            <MenuItem key={franchise.franchise_id} value={franchise.franchise_id}>
              {franchise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default GameForm;
