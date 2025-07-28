import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { Card, Grid, TextField, useTheme, Box, styled,Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "envConfig";


const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center"
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)"
}));

const JWTRegister = styled(JustifyBox)(() => ({

  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));


const initialValues = {
  email: "",
  password: "",
  role: ""
};


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email address").required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required!"),
  role: Yup.string().required("Role is required!")
});



export default function JwtRegister({ setShowAddModal, handleSuccess, fetchUsers }) {

  const theme = useTheme();
  const navigate = useNavigate();



  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    const header = {
      Authorization: "Bearer " + localStorage.getItem('token'),
      };
    try {
      const res = await axios.post(`${BASE_URL}/user/userRegistration`, values, {
        headers: header
      });
      console.log("Response:", res);
      fetchUsers();
      handleSuccess('User added successfully!');
      setShowAddModal(false);

    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const options = ['Admin', 'Lab Assistant', 'Coordinator'];

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                         <Typography variant="h4" className="title">Register User</Typography>
              <br />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      select
                      name="role"

                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      SelectProps={{ native: true }}
                      variant="outlined"
                      helperText={touched.role && errors.role}
                      error={Boolean(errors.role && touched.role)}
                      sx={{ mb: 3 }}
                    >
                      <option value="" disabled>Select a role</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </TextField>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Register
                    </LoadingButton>

                    {/* <p>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </p> */}
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}
