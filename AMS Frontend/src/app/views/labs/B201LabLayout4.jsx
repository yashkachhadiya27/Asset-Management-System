
// import React from 'react';
// import { Grid, Paper, IconButton, Tooltip, Box, Typography } from '@mui/material';
// import { Breadcrumb, SimpleCard } from 'app/components';
// import { styled } from '@mui/system';
// import ComputerIcon from '@mui/icons-material/Computer';
// import MemoryIcon from '@mui/icons-material/Memory';
// import KeyboardIcon from '@mui/icons-material/Keyboard';
// import HomeMaxIcon from '@mui/icons-material/HomeMax';
// import MouseIcon from '@mui/icons-material/Mouse';
// import { CountertopsOutlined } from '@mui/icons-material';

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
// const handleClick = (componentName) => {
//     alert(`BVM/B201/${componentName}`);
//   };

// const PC = ({ rotated, rotate270, index }) => {
//   const handleClick = (componentName) => {
//     alert(`BVM/B201/${componentName}/${index + 1}`);
//   };

//   return (
//     <RotatedPaper rotate={rotated} rotate270={rotate270}>
//       <Grid container spacing={1}>
//         <Grid item xs={12}>
//           <Grid container spacing={0.1} justifyContent="center">
//             <Grid item>
//               <Tooltip title="Monitor">
//                 <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Monitor')}>
//                   <ComputerIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//             <Grid item>
//               <Tooltip title="Adapter">
//                 <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Adapter')}>
//                   <HomeMaxIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <Grid container spacing={0.1} justifyContent="center">
//             <Grid item>
//               <Tooltip title="Keyboard">
//                 <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Keyboard')}>
//                   <KeyboardIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//             <Grid item>
//               <Tooltip title="Mouse">
//                 <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Mouse')}>
//                   <MouseIcon />
//                 </IconButton>
//               </Tooltip>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Typography align="center">{index + 1}</Typography>
//     </RotatedPaper>
//   );
// };

// export default function B201LabLayout4 () {
//   return (
//     <LabLayoutRoot>
//       <Box className="breadcrumb">
//         <Breadcrumb
//           routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B201' }]}
//         />
//       </Box>

//       <SimpleCard title="B201">
//         <Box className="lab-grid" justifyContent="center">
//           <Grid container spacing={4} justifyContent="center" style={{marginLeft:'60px'}}>
//             {[...Array(2)].map((_, columnIndex) => (
//               <Grid item key={columnIndex}>
//                 {[...Array(6)].map((_, rowIndex) => (
//                   <Grid container spacing={2} justifyContent="center" style={{ width: 'max-content' }} key={rowIndex}>
//                     {[...Array(2)].map((_, index) => (
//                       <Grid item key={index}>
//                         <PC index={columnIndex * 12 + rowIndex * 2 + index} rotated={rowIndex % 2 === 0} />
                        
//                         <Box height={20} />
//                       </Grid>
                      
//                     ))}
//                     {rowIndex % 2 === 1 && <Box height={250} />}
//                  <Box width={150} />
//                   </Grid>
//                 ))}
//               <PC index={columnIndex + 24} rotate270  />
//               </Grid>
//             ))}
           
//           </Grid>
//         </Box>
//       </SimpleCard>
//     </LabLayoutRoot>
//   );
// }


import React, { useState } from 'react';
import { Grid, Paper, IconButton, Tooltip, Box, Typography, Modal } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import ComputerIcon from '@mui/icons-material/Computer';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import MouseIcon from '@mui/icons-material/Mouse';
import axios from 'axios';

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
      const productId = `${index + 1}_26`; // Adjust for B201 layout
      const response = await axios.get(`http://localhost:5000/api/product/${productId}/${category}/B201`, { headers: header });
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
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('All-In-One')}>
                    <ComputerIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Adapter">
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Adapter')}>
                    <HomeMaxIcon />
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
              {productInfo.productCategory === 'Adapter' && (
                <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
              )}

              {productInfo.productCategory === 'All-In-One' && (
                <>
                  <Typography>processor: {productInfo.processor}</Typography>
                  <Typography>generations: {productInfo.generations}</Typography>
                  <Typography>hdd: {productInfo.hdd}</Typography>
                  <Typography>ssd: {productInfo.ssd}</Typography>
                  <Typography>productCategory: {productInfo.productCategory}</Typography>
                  <Typography>ip: {productInfo.ip}</Typography>
                  <Typography>Purchase Year: {productInfo.purchaseYear}</Typography>
                </>
              )}

              {['Keyboard', 'Mouse'].includes(productInfo.productCategory) && (
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

export default function B201LabLayout4() {
  return (
    <LabLayoutRoot>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B201' }]}
        />
      </Box>

      <SimpleCard title="B201">
        <Box className="lab-grid" justifyContent="center">
          <Grid container spacing={4} justifyContent="center" style={{ marginLeft: '60px' }}>
            {[...Array(2)].map((_, columnIndex) => (
              <Grid item key={columnIndex}>
                {[...Array(6)].map((_, rowIndex) => (
                  <Grid container spacing={2} justifyContent="center" style={{ width: 'max-content' }} key={rowIndex}>
                    {[...Array(2)].map((_, index) => (
                      <Grid item key={index}>
                        <PC index={columnIndex * 12 + rowIndex * 2 + index} rotated={rowIndex % 2 === 0} />
                        <Box height={20} />
                      </Grid>
                    ))}
                    {rowIndex % 2 === 1 && <Box height={250} />}
                    <Box width={150} />
                  </Grid>
                ))}
                <PC index={columnIndex + 24} rotate270 />
              </Grid>
            ))}
          </Grid>
        </Box>
      </SimpleCard>
    </LabLayoutRoot>
  );
}

