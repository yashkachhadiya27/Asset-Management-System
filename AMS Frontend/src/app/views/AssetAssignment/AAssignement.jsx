import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "envConfig";

const LabAssignmentForm = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [labAssistants, setLabAssistants] = useState([]);
  const [labNames, setLabNames] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [assignedLabsData, setAssignedLabsData] = useState([]); // State to hold assigned labs data
  const [showAssignedLabs, setShowAssignedLabs] = useState(false); // State for showing assigned labs table

  useEffect(() => {
    fetchUsers();
    fetchLabs();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${BASE_URL}/user/getUsers`, config);
      setUsers(response.data.data);
      setAdmins(response.data.data.filter((user) => user.role === "Coordinator"));
      setLabAssistants(response.data.data.filter((user) => user.role === "Lab Assistant"));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchLabs = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${BASE_URL}/labs/all`, config);
      const labs = response.data.data.map((lab) => lab.labName);
      setLabNames(labs);
    } catch (error) {
      console.error("Error fetching labs:", error);
    }
  };

  const handleLabChange = (labName) => {
    setSelectedLabs((prevSelected) => {
      if (prevSelected.includes(labName)) {
        return prevSelected.filter((name) => name !== labName);
      } else {
        return [...prevSelected, labName];
      }
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
  };

  const toggleTableVisibility = () => {
    handleViewAssignedLabs();
    setShowAssignedLabs((prev) => !prev);
  };
  const handleViewAssignedLabs = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${BASE_URL}/labs/all`, config);
      // Assuming the response.data.data contains the array of lab assignments
      setAssignedLabsData(response.data.data);
      console.log("Assigned Labs Data:", response.data.data); // Log for debugging
    } catch (error) {
      console.error("Error fetching assigned labs:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 10, mx: "auto", p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lab Management
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button variant="contained" color="primary" onClick={toggleFormVisibility} sx={{ mb: 3 }}>
          {formVisible ? "Close Form" : "Assign Labs"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleTableVisibility} // Fetch and show assigned labs
          sx={{ mb: 3, ml: 3 }}
        >
          {showAssignedLabs ? "Close Table" : "View Assigned Lab"}
        </Button>
      </div>

      {formVisible && (
        <Formik
          initialValues={{
            assignedBy: "",
            assignedTo: "",
            remarks: ""
          }}
          validationSchema={Yup.object({
            assignedBy: Yup.string().required("Assigned By is required!"),
            assignedTo: Yup.string().required("Assigned To is required!"),
            remarks: Yup.string().required("Remarks are required!")
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const header = {
                Authorization: "Bearer " + localStorage.getItem("token")
              };
              const formData = { ...values, labNames: selectedLabs };
              const response = await axios.post(`${BASE_URL}/labs/assign/labassignment`, formData, {
                headers: header
              });
              console.log("Form data submitted:", response.data);
              setOpenSnackbar(true);
              resetForm();
              setSelectedLabs([]);
              setFormVisible(false);
            } catch (error) {
              console.error("Error submitting form:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    name="assignedBy"
                    label="Assigned By"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.assignedBy}
                    onChange={handleChange}
                    helperText={touched.assignedBy && errors.assignedBy}
                    error={Boolean(errors.assignedBy && touched.assignedBy)}
                    sx={{ mb: 3 }}
                  >
                    {admins.length === 0 ? (
                      <MenuItem disabled>No Admins available</MenuItem>
                    ) : (
                      admins.map((user) => (
                        <MenuItem key={user._id} value={user.email}>
                          {" "}
                          {/* Use user.email instead of user._id */}
                          {user.email}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    name="assignedTo"
                    label="Assigned To"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.assignedTo}
                    onChange={handleChange}
                    helperText={touched.assignedTo && errors.assignedTo}
                    error={Boolean(errors.assignedTo && touched.assignedTo)}
                    sx={{ mb: 3 }}
                  >
                    {labAssistants.length === 0 ? (
                      <MenuItem disabled>No Lab Assistants available</MenuItem>
                    ) : (
                      labAssistants.map((user) => (
                        <MenuItem key={user._id} value={user.email}>
                          {" "}
                          {/* Use user.email instead of user._id */}
                          {user.email}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Select Labs:
                  </Typography>
                  {labNames.length === 0 ? (
                    <Typography>No labs available</Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {labNames.map((labName) => (
                        <Grid item xs={6} sm={4} md={3} key={labName}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedLabs.includes(labName)}
                                onChange={() => handleLabChange(labName)}
                              />
                            }
                            label={labName}
                            sx={{ display: "block" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="remarks"
                    label="Remarks"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.remarks}
                    onChange={handleChange}
                    helperText={touched.remarks && errors.remarks}
                    error={Boolean(errors.remarks && touched.remarks)}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Assign Labs
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}

      {openSnackbar && (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Lab assignment successfully created!
          </Alert>
        </Snackbar>
      )}

      {/* Assigned Labs Table */}
      {showAssignedLabs && (
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
                if (assignedBy !== loggedInEmail) {
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
      )}
    </Box>
  );
};

export default LabAssignmentForm;
