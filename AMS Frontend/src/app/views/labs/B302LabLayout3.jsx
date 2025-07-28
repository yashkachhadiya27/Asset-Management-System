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
//   '& .pc-grid': {
//     marginTop: theme.spacing(2),
//   },
// }));

// const RotatedPaper = styled(Paper)(({ rotate, rotate270 }) => ({
//   transform: rotate ? 'rotate(180deg)' : rotate270 ? 'rotate(270deg)' : 'none',
//   width: 100,
//   height: 'auto',
// }));

// const PC = ({ rotated, rotate270, index }) => {
//   const handleClick = (componentName) => {
//     alert(`BVM/B302/${componentName}/${index + 1}`);
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
//               <Tooltip title="CPU">
//                 <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('CPU')}>
//                   <MemoryIcon />
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
//         <Grid item xs={12}>
//           <Grid container spacing={0.1} justifyContent="center">
//             <Grid item>
//               <Tooltip title="Chair">
//                 <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Chair')}>
//                   <ChairIcon />
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

// export default function B302LabLayout3() {
//   return (
//     <LabLayoutRoot>
//       <Box className="breadcrumb">
//         <Breadcrumb
//           routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B302' }]}
//         />
//       </Box>

//       <SimpleCard title="B302">
//         <Box className="lab-grid">
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item>
//               {[...Array(8)].map((_, rowIndex) => (
//                 <React.Fragment key={rowIndex}>
//                   {rowIndex > 0 && rowIndex % 2 === 0 && (
//                     <Box height={70} />
//                   )}
//                   <Grid container columnSpacing={1} className="pc-grid">
//                     {[...Array(2)].map((_, colIndex) => (
//                       <Grid item key={colIndex}>
//                         <PC index={rowIndex * 2 + colIndex} rotated={rowIndex % 2 === 0} />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </React.Fragment>
//               ))}
//             </Grid>
//             <Box width={150} />
//             <Grid item>
//               {[...Array(8)].map((_, rowIndex) => (
//                 <React.Fragment key={rowIndex}>
//                   {rowIndex > 0 && rowIndex % 2 === 0 && (
//                     <Box height={70} /> 
//                   )}
//                   <Grid container columnSpacing={1} className="pc-grid">
//                     {[...Array(2)].map((_, colIndex) => (
//                       <Grid item key={colIndex}>
//                         <PC index={(rowIndex + 10) * 2 + colIndex} rotated={rowIndex % 2 === 0} />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </React.Fragment>
//               ))}
//             </Grid>
//           </Grid>
//         </Box>
//       </SimpleCard>
//     </LabLayoutRoot>
//   );
// }


import React, { useState } from 'react';
import { Box, Grid, IconButton, Paper, Tooltip, Typography, Modal } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MouseIcon from '@mui/icons-material/Mouse';
import ChairIcon from '@mui/icons-material/Chair';
import axios from 'axios';

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

  const fetchProductInfo = async (componentName) => {
    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem('token'),
      };
      const productId = `${index + 1}_32`; // Adjust as needed for your API
      const response = await axios.get(`http://localhost:5000/api/product/${productId}/${componentName}/B302`, { headers: header });
      setProductInfo(response.data);
      setOpen(true);  // Open the modal once data is fetched
    } catch (error) {
      console.error("Error fetching product data", error);
    }
  };

  const handleClick = (componentName) => {
    fetchProductInfo(componentName);
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
                  <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Chair')}>
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
              {['Monitor', 'Keyboard', 'Mouse'].includes(productInfo.productCategory) && (
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

export default function B302LabLayout3() {
  return (
    <LabLayoutRoot>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'B302' }]}
        />
      </Box>

      <SimpleCard title="B302">
        <Box className="lab-grid">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              {[...Array(8)].map((_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {rowIndex > 0 && rowIndex % 2 === 0 && (
                    <Box height={70} />
                  )}
                  <Grid container columnSpacing={1} className="pc-grid">
                    {[...Array(2)].map((_, colIndex) => (
                      <Grid item key={colIndex}>
                        <PC index={rowIndex * 2 + colIndex} rotated={rowIndex % 2 === 0} />
                      </Grid>
                    ))}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
            <Box width={150} />
            <Grid item>
              {[...Array(8)].map((_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {rowIndex > 0 && rowIndex % 2 === 0 && (
                    <Box height={70} />
                  )}
                  <Grid container columnSpacing={1} className="pc-grid">
                    {[...Array(2)].map((_, colIndex) => (
                      <Grid item key={colIndex}>
                        <PC index={(rowIndex) * 2 + colIndex + 16} rotated={rowIndex % 2 === 0} />
                      </Grid>
                    ))}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Box>
      </SimpleCard>
    </LabLayoutRoot>
  );
}
