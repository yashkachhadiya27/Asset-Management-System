import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Modal,
  TextField,
  IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import MySnackbar from "app/components/Snackbar";
import { BASE_URL } from "envConfig";
import moment from "moment";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200]
  }
}));

const ModalBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: "hidden"
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderSpacing: 0
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

export default function IssueItemManagement() {
  const [issues, setIssues] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [formData, setFormData] = useState({
    serialNo: "",
    issueDate: "",
    description: "",
    issuePersonName: "",
    purpose: "",
    returnDate: ""
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleSuccess = (message) => {
    setToastMessage(message);
    setToastSeverity("success");
    setToastOpen(true);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      const response = await axios.get(`${BASE_URL}/issuedItem/getIssuedItems`, {
        headers: header
      });
      setIssues(response.data.data);
    } catch (error) {
      console.error("Error fetching issues", error);
    }
  };

  const handleUpdateIssue = async () => {
    if (!selectedIssue) return;
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
      await axios.put(`${BASE_URL}/issuedItem/updateIssuedItem/${selectedIssue._id}`, formData, {
        headers: header
      });
      fetchIssues();
      setShowUpdateModal(false);
      setSelectedIssue(null);
      resetFormData();
      handleSuccess("Issue updated successfully!");
    } catch (error) {
      console.error("Error updating issue", error);
    }
  };

  const handleDeleteIssue = async (issueId) => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
      await axios.delete(`${BASE_URL}/issuedItem/deleteIssuedItem/${issueId}`, {
        headers: header
      });
      fetchIssues();
      handleSuccess("Issue deleted successfully!");
    } catch (error) {
      console.error("Error deleting issue", error);
    }
  };

  const handleShowUpdateModal = (issue) => {
    setSelectedIssue(issue);
    setFormData({
      serialNo: issue.serialNo,
      issueDate: moment(issue.issueDate).format("YYYY-MM-DD"),
      description: issue.description,
      issuePersonName: issue.issuePersonName,
      purpose: issue.purpose,
      returnDate: moment(issue.returnDate).format("YYYY-MM-DD")
    });
    setShowUpdateModal(true);
  };

  const handleAddIssueClick = () => {
    resetFormData();
    setShowAddModal(true);
  };

  const handleAddIssue = async () => {
    const header = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
      await axios.post(`${BASE_URL}/issuedItem/addIssuedItem`, formData, {
        headers: header
      });
      fetchIssues();
      setShowAddModal(false);
      resetFormData();
      handleSuccess("Issue added successfully!");
    } catch (error) {
      console.error("Error adding issue", error);
    }
  };

  const resetFormData = () => {
    setFormData({
      serialNo: "",
      issueDate: "",
      description: "",
      issuePersonName: "",
      purpose: "",
      returnDate: ""
    });
  };

  const formatDateToIndianFormat = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Box sx={{ mt: 2, p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddIssueClick}
      >
        Add Issue
      </Button>
      <StyledTableContainer component={Card} sx={{ mt: 2 }}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No</StyledTableCell>
              <StyledTableCell>Issue Date</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Issued By</StyledTableCell>
              <StyledTableCell>Purpose</StyledTableCell>
              <StyledTableCell>Return Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue._id}>
                <StyledTableCell>{issue.serialNo}</StyledTableCell>
                <StyledTableCell>{formatDateToIndianFormat(issue.issueDate)}</StyledTableCell>
                <StyledTableCell>{issue.description}</StyledTableCell>
                <StyledTableCell>{issue.issuePersonName}</StyledTableCell>
                <StyledTableCell>{issue.purpose}</StyledTableCell>
                <StyledTableCell>{formatDateToIndianFormat(issue.returnDate)}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleShowUpdateModal(issue)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteIssue(issue._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {/* Add Issue Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalBox
          sx={{
            maxWidth: 400,
            margin: "auto",
            mt: 5,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Issue
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="serialNo"
            label="Serial No"
            variant="outlined"
            value={formData.serialNo}
            onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="issueDate"
            label="Issue Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="issuePersonName"
            label="Issued By"
            variant="outlined"
            value={formData.issuePersonName}
            onChange={(e) => setFormData({ ...formData, issuePersonName: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="purpose"
            label="Purpose"
            variant="outlined"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="returnDate"
            label="Return Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddIssue}>
            Add
          </Button>
        </ModalBox>
      </Modal>

      {/* Update Issue Modal */}
      <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <ModalBox
          sx={{
            maxWidth: 400,
            margin: "auto",
            mt: 5,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Issue
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="serialNo"
            label="Serial No"
            variant="outlined"
            value={formData.serialNo}
            onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="issueDate"
            label="Issue Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="issuePersonName"
            label="Issued By"
            variant="outlined"
            value={formData.issuePersonName}
            onChange={(e) => setFormData({ ...formData, issuePersonName: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="purpose"
            label="Purpose"
            variant="outlined"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="returnDate"
            label="Return Date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateIssue}>
            Update
          </Button>
        </ModalBox>
      </Modal>

      {/* Snackbar for Notifications */}
      <MySnackbar
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={handleCloseToast}
      />
    </Box>
  );
}
