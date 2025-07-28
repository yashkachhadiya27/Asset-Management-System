import React from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "envConfig";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";


const StyledRoot = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2)
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const validationSchema = Yup.object().shape({
  productId: Yup.string()
    .required("Product ID is required")
    .matches(/^[a-zA-Z0-9-]+$/, "Product ID can only contain letters, numbers, and dashes"),
  productName: Yup.string()
    .required("Product Name is required")
    .min(3, "Product Name must be at least 3 characters long"),
  productCategory: Yup.string().required("Product Category is required"),
  processor: Yup.string().when("productCategory", {
    is: (value) => value !== "Keyboard" && value !== "Mouse" && value !== "Monitor",
    then: Yup.string().required("Processor is required")
  }),
  generations: Yup.string().when("productCategory", {
    is: (value) => value !== "Keyboard" && value !== "Mouse" && value !== "Monitor",
    then: Yup.string().required("Generation is required")
  }),
  location: Yup.string().required("Location is required"),
  purchaseYear: Yup.number()
    .required("Purchase Year is required")
    .min(2000, "Purchase Year must be 2000 or later")
    .max(new Date().getFullYear(), `Purchase Year cannot be in the future`),
  ram: Yup.string().when("productCategory", {
    is: (value) => value === "All-In-One" || value === "CPU",
    then: Yup.string().required("RAM is required")
  }),
  hdd: Yup.string().when("productCategory", {
    is: (value) => value === "All-In-One" || value === "CPU",
    then: Yup.string().required("HDD size is required")
  }),
  ssd: Yup.string().when("productCategory", {
    is: (value) => value === "All-In-One" || value === "CPU",
    then: Yup.string().required("SSD size is required")
  }),
  screenType: Yup.string().when("productCategory", {
    is: "Monitor",
    then: Yup.string().required("Screen type is required for Monitor")
  }),
  ip: Yup.string().when("productCategory", {
    is: (value) => value === "All-In-One" || value === "CPU",
    then: Yup.string().required("ip is required")
  })
});

export const Products = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`${BASE_URL}/labs/all`, config);
        setLocationOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);
  // const locationOptions = ["B301","B302", "B303", "B305","B203","B201"];
  const productCategories = ["All-In-One", "CPU", "Monitor", "Keyboard", "Mouse"];

  const initialValues = {
    productId: "",
    productName: "",
    productCategory: "",
    processor: "",
    generations: "",
    location: "",
    purchaseYear: "",
    ram: "",
    hdd: "",
    ssd: "",
    screenType: "",
    ip: ""
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
const [snackbarMessage, setSnackbarMessage] = React.useState("");
const [snackbarSeverity, setSnackbarSeverity] = React.useState("success"); // success, error, info, warning

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Set the authorization headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`${BASE_URL}/product/createProduct`, values, config);

      resetForm();

      console.log("Product added successfully:", response.data);
      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // alert("Product added successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        // alert(`Error: ${error.response.data.message || "Unable to add product."}`);
        setSnackbarMessage(`Error: ${error.response.data.message || "Unable to add product."}`);
        setSnackbarSeverity("error");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        // alert("Server did not respond. Please try again.");
        setSnackbarMessage("Server did not respond. Please try again.");
        setSnackbarSeverity("error");
      } else {
        console.error("Error in request setup:", error.message);
        setSnackbarMessage(`Error: ${error.message}`);
        setSnackbarSeverity("error");
        // alert(`Error: ${error.message}`);
      }
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  // return (
  //   <StyledRoot>
  //     <ContentBox>
  //       <Typography variant="h5">Product Management</Typography>

  //       <Formik
  //         initialValues={initialValues}
  //         // validationSchema={validationSchema}
  //         onSubmit={handleSubmit}
  //       >
  //         {({ handleSubmit, handleChange, values, errors, touched }) => (
  //           <form onSubmit={handleSubmit}>
  //             <Grid container spacing={2}>
  //               <Grid item xs={12} md={6}>
  //                 <TextField
  //                   fullWidth
  //                   name="productId"
  //                   label="Product ID"
  //                   value={values.productId}
  //                   onChange={handleChange}
  //                   error={touched.productId && Boolean(errors.productId)}
  //                   helperText={touched.productId && errors.productId}
  //                 />
  //               </Grid>
  //               <Grid item xs={12} md={6}>
  //                 <TextField
  //                   fullWidth
  //                   name="productName"
  //                   label="Product Name"
  //                   value={values.productName}
  //                   onChange={handleChange}
  //                   error={touched.productName && Boolean(errors.productName)}
  //                   helperText={touched.productName && errors.productName}
  //                 />
  //               </Grid>
  //               <Grid item xs={12} md={6}>
  //                 <FormControl fullWidth>
  //                   <InputLabel>Product Category</InputLabel>
  //                   <Select
  //                     name="productCategory"
  //                     value={values.productCategory}
  //                     onChange={handleChange}
  //                     error={touched.productCategory && Boolean(errors.productCategory)}
  //                   >
  //                     {productCategories.map((category) => (
  //                       <MenuItem key={category} value={category}>
  //                         {category}
  //                       </MenuItem>
  //                     ))}
  //                   </Select>
  //                   {touched.productCategory && errors.productCategory && (
  //                     <Typography color="error">{errors.productCategory}</Typography>
  //                   )}
  //                 </FormControl>
  //               </Grid>

  //               {values.productCategory === "Monitor" && (
  //                 <Grid item xs={12} md={6}>
  //                   <TextField
  //                     fullWidth
  //                     name="screenType"
  //                     label="Screen Type"
  //                     value={values.screenType}
  //                     onChange={handleChange}
  //                     error={touched.screenType && Boolean(errors.screenType)}
  //                     helperText={touched.screenType && errors.screenType}
  //                   />
  //                 </Grid>
  //               )}

  //               {values.productCategory !== "Keyboard" &&
  //                 values.productCategory !== "Mouse" &&
  //                 values.productCategory !== "Monitor" && (
  //                   <>
  //                     <Grid item xs={12} md={6}>
  //                       <TextField
  //                         fullWidth
  //                         name="processor"
  //                         label="Processor"
  //                         value={values.processor}
  //                         onChange={handleChange}
  //                         error={touched.processor && Boolean(errors.processor)}
  //                         helperText={touched.processor && errors.processor}
  //                       />
  //                     </Grid>
  //                     <Grid item xs={12} md={6}>
  //                       <TextField
  //                         fullWidth
  //                         name="generations"
  //                         label="Generations"
  //                         value={values.generations}
  //                         onChange={handleChange}
  //                         error={touched.generations && Boolean(errors.generations)}
  //                         helperText={touched.generations && errors.generations}
  //                       />
  //                     </Grid>
  //                   </>
  //                 )}

  //               <Grid item xs={12} md={6}>
  //                 <FormControl fullWidth>
  //                   <InputLabel>Location</InputLabel>
  //                   <Select
  //                     name="location"
  //                     value={values.location}
  //                     onChange={handleChange}
  //                     error={touched.location && Boolean(errors.location)}
  //                   >
  //                     {locationOptions.map((option) => (
  //                       <MenuItem key={option.labName} value={option.labName}>
  //                         {option.labName}
  //                       </MenuItem>
  //                     ))}
  //                   </Select>
  //                   {touched.location && errors.location && (
  //                     <Typography color="error">{errors.location}</Typography>
  //                   )}
  //                 </FormControl>
  //               </Grid>

  //               {(values.productCategory === "All-In-One" ||
  //                 values.productCategory === "CPU" ||
  //                 values.productCategory === "Monitor" ||
  //                 values.productCategory === "Keyboard" ||
  //                 values.productCategory === "Mouse") && (
  //                 <Grid item xs={12} md={6}>
  //                   <TextField
  //                     fullWidth
  //                     name="purchaseYear"
  //                     label="Purchase Year"
  //                     value={values.purchaseYear}
  //                     onChange={handleChange}
  //                     error={touched.purchaseYear && Boolean(errors.purchaseYear)}
  //                     helperText={touched.purchaseYear && errors.purchaseYear}
  //                   />
  //                 </Grid>
  //               )}

  //               {(values.productCategory === "All-In-One" || values.productCategory === "CPU") && (
  //                 <>
  //                   <Grid item xs={12} md={6}>
  //                     <TextField
  //                       fullWidth
  //                       name="ram"
  //                       label="RAM (DDR3 or DDR4)"
  //                       value={values.ram}
  //                       onChange={handleChange}
  //                       error={touched.ram && Boolean(errors.ram)}
  //                       helperText={touched.ram && errors.ram}
  //                     />
  //                   </Grid>
  //                   <Grid item xs={12} md={6}>
  //                     <TextField
  //                       fullWidth
  //                       name="hdd"
  //                       label="HDD Size"
  //                       value={values.hdd}
  //                       onChange={handleChange}
  //                       error={touched.hdd && Boolean(errors.hdd)}
  //                       helperText={touched.hdd && errors.hdd}
  //                     />
  //                   </Grid>
  //                   <Grid item xs={12} md={6}>
  //                     <TextField
  //                       fullWidth
  //                       name="ssd"
  //                       label="SSD Size"
  //                       value={values.ssd}
  //                       onChange={handleChange}
  //                       error={touched.ssd && Boolean(errors.ssd)}
  //                       helperText={touched.ssd && errors.ssd}
  //                     />
  //                   </Grid>
  //                   <Grid item xs={12} md={6}>
  //                     <TextField
  //                       fullWidth
  //                       name="ip"
  //                       label="IP Address"
  //                       value={values.ip}
  //                       onChange={handleChange}
  //                       error={touched.ip && Boolean(errors.ip)}
  //                       helperText={touched.ip && errors.initialValues}
  //                     />
  //                   </Grid>
  //                 </>
  //               )}

  //               <Grid item xs={12}>
  //                 <LoadingButton
  //                   type="submit"
  //                   loading={false} // Replace with actual loading state
  //                   variant="contained"
  //                   color="primary"
  //                 >
  //                   Submit
  //                 </LoadingButton>
  //               </Grid>
  //             </Grid>
  //           </form>
  //         )}
  //       </Formik>
  //     </ContentBox>
  //   </StyledRoot>
  // );
  return (
    <StyledRoot>
      <ContentBox>
        <Typography variant="h5">Product Management</Typography>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="productId"
                    label="Product ID"
                    value={values.productId}
                    onChange={handleChange}
                    error={touched.productId && Boolean(errors.productId)}
                    helperText={touched.productId && errors.productId}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="productName"
                    label="Product Name"
                    value={values.productName}
                    onChange={handleChange}
                    error={touched.productName && Boolean(errors.productName)}
                    helperText={touched.productName && errors.productName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Product Category</InputLabel>
                    <Select
                      name="productCategory"
                      value={values.productCategory}
                      onChange={handleChange}
                      error={touched.productCategory && Boolean(errors.productCategory)}
                    >
                      {productCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.productCategory && errors.productCategory && (
                      <Typography color="error">{errors.productCategory}</Typography>
                    )}
                  </FormControl>
                </Grid>

                {values.productCategory === "Monitor" && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="screenType"
                      label="Screen Type"
                      value={values.screenType}
                      onChange={handleChange}
                      error={touched.screenType && Boolean(errors.screenType)}
                      helperText={touched.screenType && errors.screenType}
                    />
                  </Grid>
                )}

                {["CPU", "All-In-One"].includes(values.productCategory) && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="processor"
                        label="Processor"
                        value={values.processor}
                        onChange={handleChange}
                        error={touched.processor && Boolean(errors.processor)}
                        helperText={touched.processor && errors.processor}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="generations"
                        label="Generations"
                        value={values.generations}
                        onChange={handleChange}
                        error={touched.generations && Boolean(errors.generations)}
                        helperText={touched.generations && errors.generations}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      error={touched.location && Boolean(errors.location)}
                    >
                      {locationOptions.map((option) => (
                        <MenuItem key={option.labName} value={option.labName}>
                          {option.labName}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.location && errors.location && (
                      <Typography color="error">{errors.location}</Typography>
                    )}
                  </FormControl>
                </Grid>

                {["All-In-One", "CPU", "Monitor", "Keyboard", "Mouse"].includes(
                  values.productCategory
                ) && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="purchaseYear"
                      label="Purchase Year"
                      value={values.purchaseYear}
                      onChange={handleChange}
                      error={touched.purchaseYear && Boolean(errors.purchaseYear)}
                      helperText={touched.purchaseYear && errors.purchaseYear}
                    />
                  </Grid>
                )}

                {["All-In-One", "CPU"].includes(values.productCategory) && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="ram"
                        label="RAM (DDR3 or DDR4)"
                        value={values.ram}
                        onChange={handleChange}
                        error={touched.ram && Boolean(errors.ram)}
                        helperText={touched.ram && errors.ram}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="hdd"
                        label="HDD Size"
                        value={values.hdd}
                        onChange={handleChange}
                        error={touched.hdd && Boolean(errors.hdd)}
                        helperText={touched.hdd && errors.hdd}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="ssd"
                        label="SSD Size"
                        value={values.ssd}
                        onChange={handleChange}
                        error={touched.ssd && Boolean(errors.ssd)}
                        helperText={touched.ssd && errors.ssd}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        name="ip"
                        label="IP Address"
                        value={values.ip}
                        onChange={handleChange}
                        error={touched.ip && Boolean(errors.ip)}
                        helperText={touched.ip && errors.ip}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <LoadingButton
                    type="submit"
                    loading={false}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>

        {/* Snackbar for notifications */}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ContentBox>
    </StyledRoot>
  );
};
