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
      order_id: "",
      orderNo: "",
      orderDate: "",
      purchaseDate: "",
      specification: "",
      cgst: "",
      sgst: "",
      quantity: "",
      unitPrice: "",
      totalPrice: ""
    };


    const validationSchema = Yup.object().shape({
      // order_id: Yup.string().required("Order ID is required!"),
      orderNo: Yup.string().required("Order Number is required!"),
      orderDate: Yup.date().required("Order Date is required!"),
      purchaseDate: Yup.date().required("Purchase Date is required!"),
      specification: Yup.string().required("Specification is required!"),
      cgst: Yup.number().required("CGST is required!"),
      sgst: Yup.number().required("SGST is required!"),
      quantity: Yup.number().required("Quantity Ordered is required!"),
      unitPrice: Yup.number().required("Unit Price is required!"),
      totalPrice: Yup.number().required("Order Price is required!")
    });

    export default function OrderForm() {
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
        }
        await axios.post(`${BASE_URL}/order/addOrder`, values,{
          headers:header
        })
          .then(res => {
            console.log('Order submitted successfully:', res.data);
            setSuccessMessage(res.data.message);
            resetForm(); // Clear form fields
          })
          .catch(err =>{
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
                        {/* <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="order_id"
                          label="Order ID"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.order_id}
                          onChange={handleChange}
                          helperText={touched.order_id && errors.order_id}
                          error={Boolean(errors.order_id && touched.order_id)}
                          sx={{ mb: 3 }}
                        /> */}

                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="orderNo"
                          label="Order Number"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.orderNo}
                          onChange={handleChange}
                          helperText={touched.orderNo && errors.orderNo}
                          error={Boolean(errors.orderNo && touched.orderNo)}
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
                          onBlur={handleBlur}
                          value={values.orderDate}
                          onChange={handleChange}
                          helperText={touched.orderDate && errors.orderDate}
                          error={Boolean(errors.orderDate && touched.orderDate)}
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
                          onBlur={handleBlur}
                          value={values.purchaseDate}
                          onChange={handleChange}
                          helperText={touched.purchaseDate && errors.purchaseDate}
                          error={Boolean(errors.purchaseDate && touched.purchaseDate)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="specification"
                          label="Specification"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.specification}
                          onChange={handleChange}
                          helperText={touched.specification && errors.specification}
                          error={Boolean(errors.specification && touched.specification)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="cgst"
                          label="CGST"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.cgst}
                          onChange={handleChange}
                          helperText={touched.cgst && errors.cgst}
                          error={Boolean(errors.cgst && touched.cgst)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="sgst"
                          label="SGST"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.sgst}
                          onChange={handleChange}
                          helperText={touched.sgst && errors.sgst}
                          error={Boolean(errors.sgst && touched.sgst)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="quantity"
                          label="Quantity Ordered"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.quantity}
                          onChange={handleChange}
                          helperText={touched.quantity && errors.quantity}
                          error={Boolean(errors.quantity && touched.quantity)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="unitPrice"
                          label="Unit Price"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.unitPrice}
                          onChange={handleChange}
                          helperText={touched.unitPrice && errors.unitPrice}
                          error={Boolean(errors.unitPrice && touched.unitPrice)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          name="totalPrice"
                          label="Order Price"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.totalPrice}
                          onChange={handleChange}
                          helperText={touched.totalPrice && errors.totalPrice}
                          error={Boolean(errors.totalPrice && touched.totalPrice)}
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
                          Submit Order
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
