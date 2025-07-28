// import React from 'react';
// import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
// import { Breadcrumb, SimpleCard } from 'app/components';
// import { styled } from '@mui/system';
// import ComputerIcon from '@mui/icons-material/Computer';
// import MemoryIcon from '@mui/icons-material/Memory';
// import KeyboardIcon from '@mui/icons-material/Keyboard';
// import MouseIcon from '@mui/icons-material/Mouse';
// import ChairIcon from '@mui/icons-material/Chair';

// // STYLED COMPONENTS
// const LabLayoutRoot = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
//   },
//   '& .lab-grid': {
//     overflowX: 'auto',
//     padding: theme.spacing(4),
//   },
// }));

// const RotatedPaper = styled(Paper)(({ rotate, rotate270 }) => ({
//   transform: rotate ? 'rotate(180deg)' : rotate270 ? 'rotate(270deg)' : 'none',
//   width: 100,
//   height: 'auto',
// }));

// const PC = ({ rotated, rotate270, index }) => (
//   <RotatedPaper rotate={rotated} rotate270={rotate270}>
//     <Grid container spacing={1}>
//       <Grid item xs={12}>
//         <Grid container spacing={0.1} justifyContent="center">
//           <Grid item>
//             <Tooltip title="Monitor">
//               <IconButton style={{ fontSize: 40 }}>
//                 <ComputerIcon />
//               </IconButton>
//             </Tooltip>
//           </Grid>
//           <Grid item>
//             <Tooltip title="CPU">
//               <IconButton style={{ fontSize: 40 }}>
//                 <MemoryIcon />
//               </IconButton>
//             </Tooltip>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={0.1} justifyContent="center">
//           <Grid item>
//             <Tooltip title="Keyboard">
//               <IconButton style={{ fontSize: 40 }}>
//                 <KeyboardIcon />
//               </IconButton>
//             </Tooltip>
//           </Grid>
//           <Grid item>
//             <Tooltip title="Mouse">
//               <IconButton style={{ fontSize: 40 }}>
//                 <MouseIcon />
//               </IconButton>
//             </Tooltip>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={0.1} justifyContent="center">
//           <Grid item>
//             <Tooltip title="Chair">
//               <IconButton style={{ fontSize: 40 }}>
//                 <ChairIcon />
//               </IconButton>
//             </Tooltip>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//     <Typography align="center">{index + 1}</Typography>
//   </RotatedPaper>
// );

// export default function B203LabLayout2() {
//   return (
//     <LabLayoutRoot>
//       <Box className="breadcrumb">
//         <Breadcrumb
//           routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B203' }]}
//         />
//       </Box>

//       <SimpleCard title="B203">
//         <Box className="lab-grid">
//           {/* First Row */}
//           <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
//             {[...Array(10)].map((_, index) => (
//               <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//                 <PC index={index + 1} />
//               </Grid>
//             ))}
//           </Grid>

//           <Grid container direction="column">
//             {[...Array(1)].map((_, index) => (
//               <Grid item key={index} xs={12} sm={1} md={1} lg={1} style={{ display: 'flex', margin: '-20px 20px' }}>
//                 <PC index={index} rotate270 />
//               </Grid>
//             ))}
//           </Grid>

//           <div style={{ marginLeft: '250px' }}>
//             <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
//               {[...Array(6)].map((_, index) => (
//                 <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//                   <PC index={index + 11} rotated />
//                 </Grid>
//               ))}
//             </Grid>
//             <Box height={20} />
//             <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
//               {[...Array(6)].map((_, index) => (
//                 <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//                   <PC index={index + 17} />
//                 </Grid>
//               ))}
//             </Grid>
//           </div>

//           <Box height={60} />
//           <div style={{ marginLeft: '250px' }}>
//             <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
//               {[...Array(6)].map((_, index) => (
//                 <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//                   <PC index={index + 23} rotated />
//                 </Grid>
//               ))}
//             </Grid>
//             <Box height={20} />
//             <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
//               {[...Array(6)].map((_, index) => (
//                 <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//                   <PC index={index + 29} />
//                 </Grid>
//               ))}
//             </Grid>
//           </div>

//           {/* Spacer */}
//           <Box height={40} />

//           {/* Second Row */}
//           <Grid container direction="column">
//             {[...Array(2)].map((_, index) => (
//               <Grid item key={index} xs={12} sm={1} md={1} lg={1} style={{ display: 'flex', margin: '-20px 20px' }}>
//                 <PC index={index + 35} rotate270 />
//               </Grid>
//             ))}
//           </Grid>

//           <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
//             {[...Array(10)].map((_, index) => (
//               <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
//                 <PC index={index + 37} rotated />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </SimpleCard>
//     </LabLayoutRoot>
//   );
// }


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
}));

const RotatedPaper = styled(Paper)(({ rotate, rotate270 }) => ({
  transform: rotate ? 'rotate(180deg)' : rotate270 ? 'rotate(270deg)' : 'none',
  width: 100,
  height: 'auto',
}));

const PC = ({ rotated, rotate270, index }) => {
  const [productInfo, setProductInfo] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchProductInfo = async (category) => {
    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem('token'),
      };
      const productId = `${index + 1}_47`;
      const response = await axios.get(`http://localhost:5000/api/product/${productId}/${category}/B203`, { headers: header });
      setProductInfo(response.data);
      setOpen(true); // Open the modal once data is fetched
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
                <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
              )}

              {productInfo.productCategory === 'Keyboard' && (
                <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
              )}

              {productInfo.productCategory === 'Mouse' && (
                <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
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

export default function B203LabLayout2() {
  return (
    <LabLayoutRoot>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B203' }]} />
      </Box>

      <SimpleCard title="B203">
        <Box className="lab-grid">
          {/* First Row */}
          <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
            {[...Array(10)].map((_, index) => (
              <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                <PC index={index + 1} />
              </Grid>
            ))}
          </Grid>

          <Grid container direction="column">
            {[...Array(1)].map((_, index) => (
              <Grid item key={index} xs={12} sm={1} md={1} lg={1} style={{ display: 'flex', margin: '-20px 20px' }}>
                <PC index={index} rotate270 />
              </Grid>
            ))}
          </Grid>

          <div style={{ marginLeft: '250px' }}>
            <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
              {[...Array(6)].map((_, index) => (
                <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                  <PC index={index + 11} rotated />
                </Grid>
              ))}
            </Grid>
            <Box height={20} />
            <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
              {[...Array(6)].map((_, index) => (
                <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                  <PC index={index + 17} />
                </Grid>
              ))}
            </Grid>
          </div>

          <Box height={60} />
          <div style={{ marginLeft: '250px' }}>
            <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
              {[...Array(6)].map((_, index) => (
                <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                  <PC index={index + 23} rotated />
                </Grid>
              ))}
            </Grid>
            <Box height={20} />
            <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
              {[...Array(6)].map((_, index) => (
                <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                  <PC index={index + 29} />
                </Grid>
              ))}
            </Grid>
          </div>

          <Box height={40} />

          {/* Second Row */}
          <Grid container direction="column">
            {[...Array(2)].map((_, index) => (
              <Grid item key={index} xs={12} sm={1} md={1} lg={1} style={{ display: 'flex', margin: '-20px 20px' }}>
                <PC index={index + 35} rotate270 />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} style={{ width: 'max-content', marginLeft: '60px' }}>
            {[...Array(10)].map((_, index) => (
              <Grid item key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                <PC index={index + 37} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </SimpleCard>
    </LabLayoutRoot>
  );
}
