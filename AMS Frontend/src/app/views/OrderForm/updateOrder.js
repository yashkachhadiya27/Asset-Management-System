import React, { useState, useEffect } from 'react';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Modal, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MySnackbar from 'app/components/Snackbar';
import { BASE_URL } from 'envConfig';
import moment from 'moment';

// Styled components (similar to UserManagement)
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

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    orderNo: '',
    orderDate: '',
    purchaseDate: '',
    specification: '',
    cgst: '',
    sgst: '',
    quantity: '',
    unitPrice: '',
    totalPrice: ''
  });

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
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem('token'),
      }
      const response = await axios.get(`${BASE_URL}/order/getOrders`,{
        headers: header
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };


  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    const header = {
      Authorization : "Bearer "+localStorage.getItem('token')
    }
    try {
      await axios.put(`${BASE_URL}/order/updateOrder/${selectedOrder.orderNo}`, formData,{
        headers: header
      });
      fetchOrders();
      setShowUpdateModal(false);
      setSelectedOrder(null);
      setFormData({
        orderNo: '',
        orderDate: '',
        purchaseDate: '',
        specification: '',
        cgst: '',
        sgst: '',
        quantity: '',
        unitPrice: '',
        totalPrice: ''
      });
      handleSuccess('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order', error);
    }
  };

  const handleDeleteOrder = async (orderNo) => {
    const header = {
      Authorization : "Bearer "+localStorage.getItem('token')
    }
    try {
      await axios.delete(`${BASE_URL}/order/deleteOrder/${orderNo}`,{
        headers: header
      });
      fetchOrders();
      handleSuccess('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  const handleShowUpdateModal = (order) => {
    setSelectedOrder(order);
    setFormData({
      orderNo: order.orderNo,
      orderDate:momentDate(order.orderDate),
      purchaseDate: momentDate(order.purchaseDate),
      specification: order.specification,
      cgst: order.cgst,
      sgst: order.sgst,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      totalPrice: order.totalPrice
    });
    setShowUpdateModal(true);
  };

  const handleAddOrderClick = () => {
    setShowAddModal(true);
  };


  const formatDateToIndianFormat = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad with leading zero
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`; // Return formatted date
  };
  const momentDate = (date)=>{
    const date1 = new Date(date);
        const newDate = moment(date1).format("YYYY-MM-DD");
        return newDate;
  };
  return (
    <Box sx={{ mt: 2, p: 2 }}>
      {/* <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddOrderClick}
      >
        Add Order
      </Button> */}
      <StyledTableContainer component={Card} sx={{ mt: 2 }}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Purchase Date</StyledTableCell>
              <StyledTableCell>Specification</StyledTableCell>
              <StyledTableCell>CGST</StyledTableCell>
              <StyledTableCell>SGST</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Unit Price</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (

              <TableRow key={order._id}>
                <StyledTableCell>{order.orderNo}</StyledTableCell>
                <StyledTableCell>{formatDateToIndianFormat(order.orderDate)}</StyledTableCell>
                <StyledTableCell>{formatDateToIndianFormat(order.purchaseDate)}</StyledTableCell>
                <StyledTableCell>{order.specification}</StyledTableCell>
                <StyledTableCell>{order.cgst}</StyledTableCell>
                <StyledTableCell>{order.sgst}</StyledTableCell>
                <StyledTableCell>{order.quantity}</StyledTableCell>
                <StyledTableCell>{order.unitPrice}</StyledTableCell>
                <StyledTableCell>{order.totalPrice}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleShowUpdateModal(order)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOrder(order.orderNo)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {/* Add Order Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <ModalBox sx={{ maxWidth: 400, margin: 'auto', mt: 5, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Add Order</Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="orderNo"
            label="Order Number"
            variant="outlined"
            value={formData.orderNo}
            onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="orderDate"
            label="Order Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.orderDate}
            onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="purchaseDate"
            label="Purchase Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.purchaseDate}
            onChange={(e) => setFormData({ ...formData, purchaseDate:e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="specification"
            label="Specification"
            variant="outlined"
            value={formData.specification}
            onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            name="cgst"
            label="CGST"
            variant="outlined"
            value={formData.cgst}
            onChange={(e) => setFormData({ ...formData, cgst: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            name="sgst"
            label="SGST"
            variant="outlined"
            value={formData.sgst}
            onChange={(e) => setFormData({ ...formData, sgst: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            name="quantity"
            label="Quantity Ordered"
            variant="outlined"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            name="unitPrice"
            label="Unit Price"
            variant="outlined"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            name="totalPrice"
            label="Total Price"
            variant="outlined"
            value={formData.totalPrice}
            onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrder}
              sx={{ mr: 1 }}
            >
              Add
            </Button> */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalBox>
      </Modal>

      {/* Update Order Modal */}
      <Modal
  open={showUpdateModal}
  onClose={() => setShowUpdateModal(false)}
>
  <ModalBox sx={{ overflow: 'auto',maxWidth: 500, maxHeight: '90vh', margin: 'auto', mt: 5, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>Update Order</Typography>
    <TextField
      fullWidth
      size="small"
      type="text"
      name="orderNo"
      label="Order Number"
      variant="outlined"
      value={formData.orderNo}
      onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="date"
      name="orderDate"
      label="Order Date"
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      value={formData.orderDate}
      onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="date"
      name="purchaseDate"
      label="Purchase Date"
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      value={formData.purchaseDate}
      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="text"
      name="specification"
      label="Specification"
      variant="outlined"
      value={formData.specification}
      onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="number"
      name="cgst"
      label="CGST"
      variant="outlined"
      value={formData.cgst}
      onChange={(e) => setFormData({ ...formData, cgst: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="number"
      name="sgst"
      label="SGST"
      variant="outlined"
      value={formData.sgst}
      onChange={(e) => setFormData({ ...formData, sgst: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="number"
      name="quantity"
      label="Quantity Ordered"
      variant="outlined"
      value={formData.quantity}
      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="number"
      name="unitPrice"
      label="Unit Price"
      variant="outlined"
      value={formData.unitPrice}
      onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
      sx={{ mb: 3 }}
    />
    <TextField
      fullWidth
      size="small"
      type="number"
      name="totalPrice"
      label="Total Price"
      variant="outlined"
      value={formData.totalPrice}
      onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
      sx={{ mb: 3 }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateOrder}
        sx={{ mr: 1 }}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowUpdateModal(false)}
      >
        Cancel
      </Button>
    </Box>
  </ModalBox>
</Modal>

      <MySnackbar
        open={toastOpen}
        message={toastMessage}
        onClose={handleCloseToast}
        severity={toastSeverity}
      />
    </Box>
  );
}
