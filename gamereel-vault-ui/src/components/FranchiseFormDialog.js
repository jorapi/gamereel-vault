import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const FranchiseFormDialog = ({ open, handleClose, franchise, onSave }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    // When the franchise prop changes, update the form data
    if (franchise) {
      setFormData({ name: franchise.name, description: franchise.description });
    } else {
      setFormData({ name: '', description: '' }); // Reset for new franchise
    }
  }, [franchise]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{franchise ? 'Edit Franchise' : 'Add Franchise'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Franchise Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FranchiseFormDialog;
