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
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { QRCodeSVG } from "qrcode.react";

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

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [productData, setProductData] = useState({
    productId: "",
    productName: "",
    productCategory: "",
    specification: "",
    location: "",
    processor: "",
    ram: "",
    hdd: "",
    ssd: "",
    generations: "",
    purchaseYear: ""
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const getFieldsByCategory = (product) => {
    const baseFields = [
      { name: 'productId', label: 'Product ID' },
      { name: 'productName', label: 'Product Name' },
      { name: 'productCategory', label: 'Product Category' },
      { name: 'location', label: 'Location' },
    ];

    const additionalFields = {
      'CPU': [
        { name: 'processor', label: 'Processor' },
        { name: 'ram', label: 'RAM' },
        { name: 'hdd', label: 'HDD' },
        { name: 'ssd', label: 'SSD' },
        { name: 'generations', label: 'Generation' },
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'All-In-One': [
        { name: 'processor', label: 'Processor' },
        { name: 'ram', label: 'RAM' },
        { name: 'hdd', label: 'HDD' },
        { name: 'ssd', label: 'SSD' },
        { name: 'generations', label: 'Generation' },
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'Monitor': [
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'Mouse': [
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'Keyboard': [
        { name: 'purchaseYear', label: 'Purchase Year' }
      ]
    };

    // Get category-specific fields
    const categoryFields = additionalFields[product.productCategory] || [];

    // Filter out fields with null values
    const nonNullFields = [...baseFields, ...categoryFields].filter(field =>
      product[field.name] !== null || baseFields.some(baseField => baseField.name === field.name)
    );

    return nonNullFields;
  };

  // Function to determine which fields to show for Add Product form
  const getAddFormFieldsByCategory = (category) => {
    const baseFields = [
      { name: 'productId', label: 'Product ID' },
      { name: 'productName', label: 'Product Name' },
      { name: 'productCategory', label: 'Product Category' },
      { name: 'location', label: 'Location' },
    ];

    const additionalFields = {
      'CPU': [
        { name: 'processor', label: 'Processor' },
        { name: 'ram', label: 'RAM' },
        { name: 'hdd', label: 'HDD' },
        { name: 'ssd', label: 'SSD' },
        { name: 'generations', label: 'Generation' },
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'All-In-One': [
        { name: 'processor', label: 'Processor' },
        { name: 'ram', label: 'RAM' },
        { name: 'hdd', label: 'HDD' },
        { name: 'ssd', label: 'SSD' },
        { name: 'generations', label: 'Generation' },
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'Monitor': [
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'Mouse': [
        { name: 'purchaseYear', label: 'Purchase Year' }
      ],
      'Keyboard': [
        { name: 'purchaseYear', label: 'Purchase Year' }
      ]
    };

    return [...baseFields, ...(additionalFields[category] || [])];
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const generateBarcode = (product) => {
    setSelectedProduct(product);
    setIsBarcodeModalOpen(true);
  };

  const closeBarcode = () => {
    setIsBarcodeModalOpen(false);
    setSelectedProduct(null);
  };

  const showSuccessMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setIsSnackbarOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      const response = await axios.get(`${BASE_URL}/product/getAllProducts`, {
        headers
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const addProduct = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    // Filter out empty values
    const filteredProductData = Object.entries(productData).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      await axios.post(`${BASE_URL}/product/createProduct`, filteredProductData, { headers });
      fetchProducts();
      setIsAddModalOpen(false);
      resetProductData();
      showSuccessMessage("Product added successfully!");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const updateProduct = async () => {
    if (!currentProduct) return;

    // Filter out empty or null values from productData
    const updatedData = Object.entries(productData).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    try {
      await axios.put(
        `${BASE_URL}/product/updateProduct/${currentProduct._id}`,
        updatedData,
        { headers }
      );
      fetchProducts();
      setIsUpdateModalOpen(false);
      setCurrentProduct(null);
      resetProductData();
      showSuccessMessage("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!productId || typeof productId !== 'string') {
      console.error("Invalid product ID");
      return;
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    try {
      const response = await axios.delete(`${BASE_URL}/product/deleteProduct/${productId}`, {
        headers,
      });

      if (response.status === 200) {
        fetchProducts();
        showSuccessMessage("Product deleted successfully!");
      } else {
        console.error("Failed to delete product:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error deleting product:", error.response.data.message || error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    const initialData = {
      productId: product.productId,
      productName: product.productName,
      productCategory: product.productCategory,
      location: product.location,
      processor: product.processor || '',
      ram: product.ram || '',
      hdd: product.hdd || '',
      ssd: product.ssd || '',
      generations: product.generations || '',
      purchaseYear: product.purchaseYear || ''
    };
    setProductData(initialData);
    setFormFields(getFieldsByCategory(product));
    setIsUpdateModalOpen(true);
  };

  const openAddProductModal = () => {
    resetProductData();
    setFormFields(getAddFormFieldsByCategory(productData.productCategory));
    setIsAddModalOpen(true);
  };

  const resetProductData = () => {
    setProductData({
      productId: "",
      productName: "",
      productCategory: "",
      specification: "",
      location: "",
      processor: "",
      ram: "",
      hdd: "",
      ssd: "",
      generations: "",
      purchaseYear: ""
    });
  };

  const getProductByCategory = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
      const response = await axios.get(
        `${BASE_URL}/product/getProductCategory/${productCategory}`,
        { headers }
      );
      setProducts(response.data);
      showSuccessMessage("Products fetched successfully!");
    } catch (error) {
      console.error("Error fetching products by category", error);
    }
  };

  // Handle product category change in Add Product form
  const handleProductCategoryChange = (e) => {
    const category = e.target.value;
    setProductData({ ...productData, productCategory: category });
    setFormFields(getAddFormFieldsByCategory(category));
  };

  return (
    <Box sx={{ mt: 2, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={fetchProducts}
          >
            All
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setProductCategory("All-In-One");
              getProductByCategory();
            }}
            sx={{ ml: 1 }}
          >
            All-In-One
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setProductCategory("CPU");
              getProductByCategory();
            }}
            sx={{ ml: 1 }}
          >
            CPU
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setProductCategory("Monitor");
              getProductByCategory();
            }}
            sx={{ ml: 1 }}
          >
            Monitor
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setProductCategory("Mouse");
              getProductByCategory();
            }}
            sx={{ ml: 1 }}
          >
            Mouse
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setProductCategory("Keyboard");
              getProductByCategory();
            }}
            sx={{ ml: 1 }}
          >
            Keyboard
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openAddProductModal}
        >
          Add Product
        </Button>
      </Box>

      <StyledTableContainer component={Card}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Product Category</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <StyledTableCell>{product.productId || "N/A"}</StyledTableCell>
                  <StyledTableCell>{product.productName || "N/A"}</StyledTableCell>
                  <StyledTableCell>{product.productCategory || "N/A"}</StyledTableCell>
                  <StyledTableCell>{product.location || "N/A"}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => openUpdateModal(product)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteProduct(product._id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => generateBarcode(product)} color="default">
                      <QrCode2Icon />
                    </IconButton>
                    </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={5} align="center">
                  No products available
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {/* Add Product Modal */}
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            maxHeight: '90vh',
            overflow: 'auto'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Product
          </Typography>

          {/* Category Selection First */}
          <TextField
            fullWidth
            select
            size="small"
            name="productCategory"
            label="Product Category"
            variant="outlined"
            value={productData.productCategory}
            onChange={handleProductCategoryChange}
            sx={{ mb: 3 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select Category</option>
            <option value="All-In-One">All-In-One</option>
            <option value="CPU">CPU</option>
            <option value="Monitor">Monitor</option>
            <option value="Mouse">Mouse</option>
            <option value="Keyboard">Keyboard</option>
          </TextField>

          {/* Dynamic Fields based on Category */}
          {formFields.map((field) => (
            field.name !== 'productCategory' && (
              <TextField
                key={field.name}
                fullWidth
                size="small"
                type="text"
                name={field.name}
                label={field.label}
                variant="outlined"
                value={productData[field.name]}
                onChange={(e) => setProductData({ ...productData, [field.name]: e.target.value })}
                sx={{ mb: 3 }}
                disabled={field.disabled}
              />
            )
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={addProduct}
            sx={{ mt: 2 }}
            fullWidth
          >
            Add Product
          </Button>
        </ModalBox>
      </Modal>

      {/* Update Product Modal */}
      <Modal open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <ModalBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            maxHeight: '90vh',
            overflow: 'auto'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Update Product
          </Typography>

          {formFields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              size="small"
              type="text"
              name={field.name}
              label={field.label}
              variant="outlined"
              value={productData[field.name]}
              onChange={(e) => setProductData({ ...productData, [field.name]: e.target.value })}
              sx={{ mb: 3 }}
              disabled={field.disabled}
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={updateProduct}
            sx={{ mt: 2 }}
            fullWidth
          >
            Update Product
          </Button>
        </ModalBox>
      </Modal>

      {/* QR Code Modal */}
      <Modal open={isBarcodeModalOpen} onClose={closeBarcode}>
        <ModalBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product QR Code
          </Typography>
          {selectedProduct && (
            <>
              <QRCodeSVG
                value={JSON.stringify(selectedProduct)}
                size={200}
                level="H"
                includeMargin={true}
              />
              <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                Scan this code to view product details
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={closeBarcode}
            sx={{ mt: 2 }}
            fullWidth
          >
            Close
          </Button>
        </ModalBox>
      </Modal>

      {/* Snackbar for Notifications */}
      <MySnackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}