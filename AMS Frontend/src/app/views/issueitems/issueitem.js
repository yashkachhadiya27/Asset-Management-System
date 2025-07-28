import { useState } from "react";
import { Card, Grid, TextField, styled, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { BASE_URL } from "envConfig";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));

// Form initial values
const initialValues = {
  serialNo: "",
  issueDate: "",
  description: "",
  issuePersonName: "",
  purpose: "",
  returnDate: ""
};

const validationSchema = Yup.object().shape({
  serialNo: Yup.string().required("Serial Number is required!"),
  issueDate: Yup.date().required("Issue Date is required!"),
  description: Yup.string().required("Description is required!"),
  issuePersonName: Yup.string().required("Issue Person Name is required!"),
  purpose: Yup.string().required("Purpose is required!"),
  returnDate: Yup.date().nullable() // Return date is optional
});

export default function IssueForm() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(""); // State to handle form submission errors
  const [successMessage, setSuccessMessage] = useState(""); // State to handle success message

  // Handle form submission
  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setFormError(""); // Clear previous error
    setSuccessMessage(""); // Clear previous success message
    const header = {
      Authorization: "Bearer " + localStorage.getItem('token'),
    };
    await axios.post(`${BASE_URL}/issuedItem/addIssuedItem`, values, {
      headers: header
    })
      .then(res => {
        console.log('Issue submitted successfully:', res.data);
        setSuccessMessage(res.data.message);
        resetForm(); // Clear form fields
      })
      .catch(err => {
        setFormError(err.response.data.message);
      });
    setLoading(false); // Ensure loading state is reset
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="serialNo"
                      label="Serial Number"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.serialNo}
                      onChange={handleChange}
                      helperText={touched.serialNo && errors.serialNo}
                      error={Boolean(errors.serialNo && touched.serialNo)}
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
                      onBlur={handleBlur}
                      value={values.issueDate}
                      onChange={handleChange}
                      helperText={touched.issueDate && errors.issueDate}
                      error={Boolean(errors.issueDate && touched.issueDate)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="description"
                      label="Description"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.description}
                      onChange={handleChange}
                      helperText={touched.description && errors.description}
                      error={Boolean(errors.description && touched.description)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="issuePersonName"
                      label="Issue Person Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.issuePersonName}
                      onChange={handleChange}
                      helperText={touched.issuePersonName && errors.issuePersonName}
                      error={Boolean(errors.issuePersonName && touched.issuePersonName)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="purpose"
                      label="Purpose"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.purpose}
                      onChange={handleChange}
                      helperText={touched.purpose && errors.purpose}
                      error={Boolean(errors.purpose && touched.purpose)}
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
                      onBlur={handleBlur}
                      value={values.returnDate}
                      onChange={handleChange}
                      helperText={touched.returnDate && errors.returnDate}
                      error={Boolean(errors.returnDate && touched.returnDate)}
                      sx={{ mb: 3 }}
                    />

                    {formError && (
                      <p style={{ color: 'red', marginBottom: '16px' }}>{formError}</p>
                    )}

                    {successMessage && (
                      <p style={{ color: 'green', marginBottom: '16px' }}>{successMessage}</p>
                    )}

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Submit Issue
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
