import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addLab } from '../services/labService';

const AddLab = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [layout, setLayout] = useState('');

  const handleSubmit = async () => {
    const layoutArray = layout.split('|').map(row => row.split(',').map(Number));
    await addLab({ name, layout: layoutArray });
    onAdd();
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New Lab</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Lab Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Lab Layout (e.g., 1,0,1|0,1,0)"
          fullWidth
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Lab
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLab;
