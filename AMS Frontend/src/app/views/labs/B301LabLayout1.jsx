import React, { useState } from 'react';
import axios from 'axios';
import { Box, Grid, IconButton, Tooltip, Typography, Paper, Modal } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MouseIcon from '@mui/icons-material/Mouse';
import ChairIcon from '@mui/icons-material/Chair';

// STYLED COMPONENTS
const LabLayoutRoot = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .lab-grid': {
    overflowX: 'auto',
    padding: theme.spacing(4),
  },
  '& .pc-grid': {
    marginTop: theme.spacing(2),
  },
}));

const RotatedPaper = styled(Paper)(({ rotate, rotate270 }) => ({
  transform: rotate ? 'rotate(180deg)' : rotate270 ? 'rotate(270deg)' : 'none',
  width: 100,
  height: 'auto',
}));

const PC = ({ rotated, rotate270, index }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchProductInfo = async (category,productId) => {
    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem('token'),
      };
      // Construct the productId based on the index
      const productId = `${index + 1}_30`; // Example: '1_xx' for index 0
      const response = await axios.get(`http://localhost:5000/api/product/${productId}/${category}/B301`, { headers: header });
      setProductInfo(response.data);
      console.log(response.data);
      
      setOpen(true);  // Open the modal once data is fetched
    } catch (error) {
      console.error("Error fetching product data", error);
    }
  };

  const handleClick = (category) => {
    fetchProductInfo(category);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RotatedPaper rotate={rotated} rotate270={rotate270}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={0.1} justifyContent="center">
              <Grid item>
                <Tooltip title="Monitor">
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Monitor')}>
                    <ComputerIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="CPU">
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('CPU')}>
                    <MemoryIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0.1} justifyContent="center">
              <Grid item>
                <Tooltip title="Keyboard">
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Keyboard')}>
                    <KeyboardIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Mouse">
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Mouse')}>
                    <MouseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0.1} justifyContent="center">
              <Grid item>
                <Tooltip title="Chair">
                  <IconButton style={{ fontSize: 40 }}>
                    <ChairIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography align="center">{index + 1}</Typography>
      </RotatedPaper>

      {/* Modal to display product info */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {productInfo ? (
            <div>
              <Typography id="product-modal-title" variant="h6" component="h2">
                {productInfo.productName}
              </Typography>

              {/* Display fields based on category */}
              {productInfo.productCategory === 'CPU' && (
                <>
                  <Typography>Processor: {productInfo.processor}</Typography>
                  <Typography>Generation: {productInfo.generations}</Typography>
                  <Typography>RAM: {productInfo.ram}</Typography>
                  <Typography>Storage-HDD: {productInfo.hdd}</Typography>
                  <Typography>Storage-SSD: {productInfo.ssd}</Typography>
                  <Typography>IP: {productInfo.ip}</Typography>
                  <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
                </>
              )}

              {productInfo.productCategory === 'Monitor' && (
                <>
                  <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
                </>
              )}

              {productInfo.productCategory === 'Keyboard' && (
                <>
                  <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
                </>
              )}

              {productInfo.productCategory === 'Mouse' && (
                <>
                  <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
                </>
              )}

            </div>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default function B301LabLayout1() {
  return (
    <LabLayoutRoot>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B301' }]} />
      </Box>

      <SimpleCard title="B301">
        <Box className="lab-grid">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              {[...Array(5)].map((_, rowIndex) => (
                <Grid container spacing={2} key={rowIndex} className="pc-grid">
                  {[...Array(3)].map((_, colIndex) => (
                    <Grid item key={colIndex}>
                      <PC index={rowIndex * 3 + colIndex} />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
            <Box width={150} />
            <Grid item>
              {[...Array(5)].map((_, rowIndex) => (
                <Grid container spacing={2} key={rowIndex} className="pc-grid">
                  {[...Array(3)].map((_, colIndex) => (
                    <Grid item key={colIndex}>
                      <PC index={(rowIndex + 5) * 3 + colIndex} />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </SimpleCard>
    </LabLayoutRoot>
  );
}
