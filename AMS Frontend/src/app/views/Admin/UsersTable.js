import React, { useState, useEffect } from 'react';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Modal, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import JwtRegister from '../sessions/JwtRegister';
import MySnackbar from 'app/components/Snackbar';
import { BASE_URL } from 'envConfig';
// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ModalBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderSpacing: 0,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleSuccess = (message) => {
    setToastMessage(message);
    setToastSeverity('success');
    setToastOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const header = {
      Authorization : "Bearer "+localStorage.getItem('token')
    }
    try {
      const response = await axios.get(`${BASE_URL}/user/getUsers`, {
        headers: header
      });
      setUsers(response.data.data);
    }
    catch (error) {
      console.error('Error fetching users', error);
    }
  };


  const handleAddUser = async () => {
    try {
      await axios.post('/api/users', formData);
      fetchUsers();
      setShowAddModal(false);
      setFormData({ email: '', password: '', role: '' });
      handleSuccess('User added successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user', error);
    }
  };




  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    const header = {
      Authorization : "Bearer "+localStorage.getItem('token')
    }
    try {
      await axios.put(`${BASE_URL}/user/updateUser/${selectedUser._id}`, formData,{
        headers: header
      });
      fetchUsers();
      setShowUpdateModal(false);
      setSelectedUser(null);
      setFormData({ email: '', password: '', role: '' });
      handleSuccess('User updated successfully!');
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleDeleteUser = async (id) => {
    console.log(id)
    const header = {
      Authorization : "Bearer "+localStorage.getItem('token')
    }
    try {
      await axios.delete(`${BASE_URL}/user/deleteUser/${id}`,{
        headers: header
      });
      fetchUsers();
      handleSuccess('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };




  const handleShowUpdateModal = (user) => {
    setSelectedUser(user);
    setFormData({ email: user.email, password: '', role: user.role });
    setShowUpdateModal(true);
  };

  const handleAddUserClick = () => {
    setShowAddModal(true);
  };

  return (
    <Box sx={{ mt: 2, p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddUserClick}
      >
        Add User
      </Button>
      <StyledTableContainer component={Card} sx={{ mt: 2 }}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleShowUpdateModal(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {/* Add User Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}>
        <Box
           sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800,
                    bgcolor: 'transparent', // Set background to transparent
                    boxShadow: 'none',      // Remove shadow if desired
                    borderRadius: 1,
                  }}>
          <JwtRegister setShowAddModal={setShowAddModal} handleSuccess={handleSuccess} fetchUsers={fetchUsers} />
        </Box>
      </Modal>
      <MySnackbar
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleCloseToast}
      />

      {/* Update User Modal */}
      <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <ModalBox sx={{ maxWidth: 400, margin: 'auto', mt: 5, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Update User</Typography>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdateUser}
            sx={{ mt: 2 }}
          >
            Update User
          </Button>
        </ModalBox>
      </Modal>
    </Box>
  );
}
