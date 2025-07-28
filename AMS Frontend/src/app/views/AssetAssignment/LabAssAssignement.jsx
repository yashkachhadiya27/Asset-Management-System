import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "envConfig";

const LabAssistentLabs = () => {
  const [assignedLabsData, setAssignedLabsData] = useState([]);

  useEffect(() => {
    fetchAssignedLabs();
  }, []);

  const fetchAssignedLabs = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${BASE_URL}/labs/all`, config);
      setAssignedLabsData(response.data.data);
    } catch (error) {
      console.error("Error fetching assigned labs:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 10, mx: "auto", p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Labs
      </Typography>

      {assignedLabsData.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 5, pl: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assigned To</TableCell>
                <TableCell>Assigned By</TableCell>
                <TableCell>Labs</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedLabsData.map((labAssignment) => {
                if (!labAssignment || !labAssignment.labAssistant) return null;

                const assignedTo = labAssignment.labAssistant.aemail || "N/A";
                const assignedBy = labAssignment.labAssistant.cemail || "N/A";
                const labName = labAssignment.labName || "No Lab Assigned";
                const remarks = labAssignment.labAssistant.remarks || "No Remarks";

                // Get the current logged-in user's email from localStorage
                const loggedInEmail = localStorage.getItem("email");

                // Check if the 'Assigned By' email matches the logged-in email
                if (assignedTo !== loggedInEmail) {
                  return null; // Skip this row if it doesn't match
                }

                // Optionally, skip empty rows if needed
                if (
                  assignedTo === "N/A" &&
                  assignedBy === "N/A" &&
                  labName === "No Lab Assigned" &&
                  remarks === "No Remarks"
                ) {
                  return null;
                }

                return (
                  <TableRow key={labAssignment._id}>
                    <TableCell>{assignedTo}</TableCell>
                    <TableCell>{assignedBy}</TableCell>
                    <TableCell>{labName}</TableCell>
                    <TableCell>{remarks}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center">
          No lab assignments found.
        </Typography>
      )}
    </Box>
  );
};

export default LabAssistentLabs;
