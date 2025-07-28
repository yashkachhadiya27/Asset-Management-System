import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Grid, TextField, styled, useTheme,Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {BASE_URL, LOCAL_URL} from "../../../envConfig"


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
  },
  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

// Form initial values
const initialValues = {
  email: "",
  password: "",
  role: ""
};

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email address").required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required!"),
  role: Yup.string().required("Role is required!")
});

export default function JwtLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const handleFormSubmit = async (values) => {
    setLoading(true);
    setLoginError("");
    try {
      const res = await axios.post(`${BASE_URL}/user/userLogin`, values); // Adjust URL as needed
      console.log(res);
      localStorage.setItem('token', res.data.data.accessToken);
      localStorage.setItem('role',res.data.data.role);
      localStorage.setItem('email',res.data.data.email);
      navigate("/dashboard");
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setLoginError("Incorrect email or password. Please try again.");
      } else {
        setLoginError("Invalid Credentials");
      }
      setLoading(false);
    }
  };

  const options = ['Admin', 'Lab Assistant', 'Coordinator'];

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img src="/assets/images/illustrations/Login.svg" width="100%" alt="Illustration" />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Typography variant="h4" className="title">Login</Typography>
              <br />
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
                      sx={{ mb: 1.5 }}
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

                    {loginError && (
                      <p style={{ color: 'red', marginBottom: '16px' }}>{loginError}</p>
                    )}

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>

                    {/* <p>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Register
                      </NavLink>
                    </p> */}
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
