import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { BASE_URL } from 'envConfig';

export default function Specifications() {
  const [productGroups, setProductGroups] = useState([]); // Initialize as an empty array

  // Fetch product groups from the API using axios
  const fetchProductGroups = async () => {
    try {
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      const response = await axios.get(`${BASE_URL}/product/products`, {
        headers,
      });

      // Log the response to check the structure
      console.log('API Response:', response.data);

      // Ensure you are accessing the correct data structure
      // If the data is nested, adjust this line accordingly
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];

      setProductGroups(data);
    } catch (error) {
      console.error('Error fetching product groups:', error);
    }
  };

  useEffect(() => {
    fetchProductGroups();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Specifications
      </Typography>
      <Grid container spacing={3}>
        {productGroups.map((group, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group.productName}
                </Typography>
                <Typography color="textSecondary">
                  <strong>Category:</strong> {group.productCategory}
                </Typography>
                <Typography color="textSecondary">
                  <strong>Count:</strong> {group.count}
                </Typography>
                <Typography color="textSecondary">
                  <strong>Product IDs:</strong> {group.productIds.join(', ')}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                  <strong>Specifications:</strong> {group.specification}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
