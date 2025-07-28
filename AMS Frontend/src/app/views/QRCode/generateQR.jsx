import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "envConfig";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";

const GenerateQR = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${BASE_URL}/labs/all`, config);
        setLabs(response.data.data);
      } catch (error) {
        console.error("Error fetching labs:", error);
        setError("Failed to fetch labs");
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const handleGenerateQR = async (labName) => {
    setSnackbarMessage(`Generating QR codes for ${labName}...`);
    setSnackbarOpen(true);
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${BASE_URL}/product/getProductsByLocation/${labName}`, config);

        console.log("API Response:", response.data); // Log the entire response for debugging

        if (!response.data || !response.data.data || !Array.isArray(response.data.data.products)) {
            throw new Error("Invalid data structure received from the server");
        }

        const products = response.data.data.products;

        if (products.length === 0) {
            setSnackbarMessage(`No products found for ${labName}`);
            setSnackbarOpen(true);
            return;
        }

        await generatePDF(products, labName);
        setSnackbarMessage(`QR codes generated successfully for ${labName}`);
    } catch (error) {
        console.error("Error in handleGenerateQR:", error);
        setError(`Failed to fetch products for ${labName}: ${error.message}`);
        setSnackbarMessage(`Error: ${error.message}`);
    } finally {
        setSnackbarOpen(true);
    }
};

const generatePDF = async (products, labName) => {
    const doc = new jsPDF();
    let y = 10;

    const generateQRCode = (product, index) => {
        return new Promise((resolve) => {
            const qrCodeContainer = document.createElement('div');
            const qrCodeValue = JSON.stringify(product); // Encode the entire product object
            const qrCode = <QRCodeSVG value={qrCodeValue} size={80} />;
            ReactDOM.render(qrCode, qrCodeContainer, () => {
                const svgElement = qrCodeContainer.querySelector('svg');
                const svgString = new XMLSerializer().serializeToString(svgElement);

                // Convert SVG to PNG
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const pngData = canvas.toDataURL('image/png');

                    if (index % 2 === 0 && index !== 0) {
                        doc.addPage();
                        y = 10;
                    }

                    doc.addImage(pngData, 'PNG', 10, y, 80, 80);
                    doc.setFontSize(12);

                    const productName = product.productName || 'Unknown Product';
                    doc.text(productName, 100, y + 40);

                    y += 100;
                    resolve();
                };
                img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
            });
        });
    };

    const processProducts = async () => {
        for (let i = 0; i < products.length; i++) {
            await generateQRCode(products[i], i);
        }
        doc.save(`${labName}_QR_Codes.pdf`);
    };

    await processProducts();
};


  return (
    <Box sx={{ maxWidth: 800, margin: 10, mx: "auto", p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Generate QR for Labs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : labs.length === 0 ? (
        <Typography>No labs available</Typography>
      ) : (
        <List>
          {labs.map((lab) => (
            <ListItem key={lab._id} secondaryAction={
              <Button variant="contained" color="primary" onClick={() => handleGenerateQR(lab.labName)}>
                Generate QR Code
              </Button>
            }>
              <ListItemText primary={lab.labName} />
            </ListItem>
          ))}
        </List>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default GenerateQR;