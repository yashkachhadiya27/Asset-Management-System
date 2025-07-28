// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from '@mui/material';
// import { Breadcrumb, SimpleCard } from 'app/components';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from "envConfig";

// // STYLED COMPONENTS
// const ButtonLayoutRoot = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
//   },
//   '& .button-grid': {
//     padding: theme.spacing(4),
//   },
// }));

// // Individual Button Component
// const DynamicButton = ({ label, onClick }) => (
//   <Button variant="contained" color="primary" onClick={onClick}>
//     {label}
//   </Button>
// );

// export default function ButtonLayout() {
//   const [open, setOpen] = useState(false);
//   const [labName, setLabName] = useState('');
//   const [numSystems, setNumSystems] = useState('');
//   const [buttons, setButtons] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [formError, setFormError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const navigate = useNavigate();

//   // Fetch user role and labs on mount
//   useEffect(() => {
//     const fetchLabsAndRole = async () => {
//       try {
//         const header = {
//           Authorization: "Bearer " + localStorage.getItem('token'),
//         };
        
//         const storedRole = localStorage.getItem('role'); 
//         setUserRole(storedRole);
        
//         const response = await axios.get(`${BASE_URL}/labs/all`, { headers: header });
//         setButtons(response.data.data.map(lab => ({ label: lab.labName, path: lab.path })));
//       } catch (error) {
//         console.error('Error fetching labs or role:', error);
//         setFormError('Could not fetch labs or role. Please try again later.');
//       }
//     };

//     fetchLabsAndRole();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setLabName('');
//     setNumSystems('');
//     setFormError('');
//   };

//   // const handleSubmit = async () => {
//   //   if (!labName || !numSystems || isNaN(numSystems) || numSystems <= 0) {
//   //     setFormError('Lab name and a valid number of systems are required');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   const newButton = { label: labName, path: `/labs/${labName}` };

//   //   try {
//   //     const header = {
//   //       Authorization: "Bearer " + localStorage.getItem('token'),
//   //     };

//   //     const pcCoordinates = Array(parseInt(numSystems, 10)).fill({ x: 0, y: 0 });
//   //     await axios.post(`${BASE_URL}/labs/add-lab`, 
//   //       { labName, numSystems: parseInt(numSystems, 10), pcCoordinates }, 
//   //       { headers: header }
//   //     );

//   //     // await axios.post(`${BASE_URL}/labs/create-lab-layout`, 
//   //     //   { labName, numSystems: parseInt(numSystems, 10) }, 
//   //     //   { headers: header }
//   //     // );

//   //     setButtons((prevButtons) => [...prevButtons, newButton]);
//   //     setSuccessMessage('Lab added and layout created successfully!');
//   //   } catch (error) {
//   //     console.error('Error adding lab or creating layout:', error);
//   //     setFormError(error.response?.data?.message || 'An error occurred while adding the lab');
//   //   } finally {
//   //     setLoading(false);
//   //     handleClose();
//   //   }
//   // };

//   const handleSubmit = async () => {
//     if (!labName || !numSystems || isNaN(numSystems) || numSystems <= 0) {
//       setFormError('Lab name and a valid number of systems are required');
//       return;
//     }
  
//     setLoading(true);
//     const newButton = { label: labName, path: `/labs/${labName}` };
  
//     try {
//       // Generate the lab layout JSX content dynamically
//       const labLayoutContent = `
//       import React, { useState, useEffect } from 'react';
//       import { Box, Grid, IconButton, Paper, Tooltip, Typography, Button } from '@mui/material';
//       import { Breadcrumb, SimpleCard } from 'app/components';
//       import { styled } from '@mui/system';
//       import { DndProvider, useDrag } from 'react-dnd';
//       import { HTML5Backend } from 'react-dnd-html5-backend';
//       import ComputerIcon from '@mui/icons-material/Computer';
//       import MemoryIcon from '@mui/icons-material/Memory';
//       import KeyboardIcon from '@mui/icons-material/Keyboard';
//       import MouseIcon from '@mui/icons-material/Mouse';
//       import ChairIcon from '@mui/icons-material/Chair';
//       import axios from 'axios';
//       import { BASE_URL } from 'envConfig'; // Replace with your config
      
//       const LabLayoutRoot = styled('div')(({ theme }) => ({
//         margin: '30px',
//         [theme.breakpoints.down('sm')]: { margin: '16px' },
//         '& .breadcrumb': {
//           marginBottom: '30px',
//           [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
//         },
//         '& .lab-grid': {
//           overflowX: 'auto',
//           padding: theme.spacing(4),
//           position: 'relative',
//           height: '500px',
//           border: '1px solid #ccc',
//           marginTop: theme.spacing(4),
//         },
//       }));
      
//       const RotatedPaper = styled(Paper)(({ top, left }) => ({
//         position: 'absolute',
//         width: 100,
//         top: \`\${top}px\`,
//         left: \`\${left}px\`,
//         cursor: 'move',
//       }));
      
//       const PC = ({ index, top, left, movePC, isEditMode }) => {
//         const [, drag] = useDrag({
//           type: 'PC',
//           item: { index, top, left },
//           canDrag: isEditMode,
//           end: (item, monitor) => {
//             const delta = monitor.getDifferenceFromInitialOffset();
//             if (item && delta) {
//               const newLeft = Math.round(item.left + delta.x);
//               const newTop = Math.round(item.top + delta.y);
//               movePC(item.index, newTop, newLeft);
//             }
//           },
//         });
      
//         const handleClick = (componentName) => {
//           alert(\`Clicked on: \${componentName}\`);
//         };
   
//         return (
//           <RotatedPaper ref={drag} top={top} left={left}>
//             <Grid container spacing={1}>
//               <Grid item xs={12}>
//                 <Grid container spacing={0.1} justifyContent="center">
//                   <Grid item>
//                     <Tooltip title="Monitor">
//                       <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Monitor')}>
//                         <ComputerIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </Grid>
//                   <Grid item>
//                     <Tooltip title="CPU">
//                       <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('CPU')}>
//                         <MemoryIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12}>
//                 <Grid container spacing={0.1} justifyContent="center">
//                   <Grid item>
//                     <Tooltip title="Keyboard">
//                       <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Keyboard')}>
//                         <KeyboardIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </Grid>
//                   <Grid item>
//                     <Tooltip title="Mouse">
//                       <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Mouse')}>
//                         <MouseIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12}>
//                 <Grid container spacing={0.1} justifyContent="center">
//                   <Grid item>
//                     <Tooltip title="Chair">
//                       <IconButton style={{ fontSize: 40 }} onClick={() => handleClick('Chair')}>
//                         <ChairIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Typography align="center">{index + 1}</Typography>
//           </RotatedPaper>
//         );
//       };
      
//       export default function ${labName}LabLayout() {
//         const [isEditMode, setEditMode] = useState(false);
//         const [pcPositions, setPcPositions] = useState([...Array(${numSystems})].map(() => ({ top: 0, left: 0 })));
//         const [userRole, setUserRole] = useState('');
      
//         useEffect(() => {
//           const fetchLabLayout = async () => {
//             try {
//               const response = await axios.get(\`\${BASE_URL}/labs/${labName}/layout\`);
//               setPcPositions(response.data.data || pcPositions);
//               const storedRole = localStorage.getItem('role'); 
//               setUserRole(storedRole);
//             } catch (error) {
//               console.error('Error fetching lab layout:', error);
//             }
//           };
//           fetchLabLayout();
//         }, []);
      
//         const movePC = (index, newTop, newLeft) => {
//           setPcPositions((prevPositions) => {
//             const updatedPositions = [...prevPositions];
//             updatedPositions[index] = { top: newTop, left: newLeft };
//             return updatedPositions;
//           });
//         };
      
//         const saveLayout = async () => {
//           try {
//             await axios.put(\`\${BASE_URL}/labs/${labName}/layout\`, { pcPositions });
//             setEditMode(false);
//           } catch (error) {
//             console.error('Error saving layout:', error);
//           }
//         };
      
//         return (
//           <LabLayoutRoot>
//             <Box className="breadcrumb">
//               <Breadcrumb routeSegments={[{ name: 'Labs', path: '/labs' }, { name: '${labName}' }]} />
//             </Box>
      
//             <SimpleCard title="${labName}">
//              {userRole === 'Coordinator' && (
//               <Button variant="contained" onClick={() => (isEditMode ? saveLayout() : setEditMode(true))}>
//                 {isEditMode ? 'Save Layout' : 'Edit Layout'}
//               </Button>
//               )}
//               <Box className="lab-grid">
//                 <DndProvider backend={HTML5Backend}>
//                   <Grid container spacing={2}>
//                     {pcPositions.map((pos, index) => (
//                       <Grid item style={{ display: 'flex', justifyContent: 'center' }} key={index}>
//                         <PC index={index} top={pos.top} left={pos.left} movePC={movePC} isEditMode={isEditMode} />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </DndProvider>
//               </Box>
//             </SimpleCard>
//           </LabLayoutRoot>
//         );
//       }
//       `;
  
//       // Create a Blob object representing the JSX file content
//       const blob = new Blob([labLayoutContent], { type: 'text/jsx' });
  
//       // Create a download link
//       const downloadLink = document.createElement('a');
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.download = `${labName}LabLayout.jsx`;
  
//       // Programmatically click the download link to trigger the download
//       downloadLink.click();
  
//       // Update the buttons with the new lab layout
//       setButtons((prevButtons) => [...prevButtons, newButton]);
//       setSuccessMessage('Lab added and layout file generated successfully!');
  
//     } catch (error) {
//       console.error('Error adding lab or generating layout:', error);
//       setFormError(error.message || 'An error occurred while adding the lab');
//     } finally {
//       setLoading(false);
//       handleClose();
//     }
//   };
  
//   return (
//     <ButtonLayoutRoot>
//       <Box className="breadcrumb">
//         <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Labs' }]} />
//       </Box>

//       <SimpleCard title="Button Layout">
//         <Box className="button-grid">
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item>
//               <Grid container spacing={2}>
//                 {buttons.map((button) => (
//                   <Grid item key={button.label}>
//                     <DynamicButton label={button.label} onClick={() => navigate(button.path)} />
//                   </Grid>
//                 ))}
//               </Grid>
//               <Box height={20} />
            
//               {userRole === 'Coordinator' && (
//                 <Button variant="contained" color="secondary" onClick={handleClickOpen}>
//                   Add New Lab
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       </SimpleCard>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Lab</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Lab Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={labName}
//             onChange={(e) => setLabName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Number of Systems"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={numSystems}
//             onChange={(e) => setNumSystems(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit} disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {successMessage && <div>{successMessage}</div>}
//       {formError && <div style={{ color: 'red' }}>{formError}</div>}
//     </ButtonLayoutRoot>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from '@mui/material';
// import { Breadcrumb, SimpleCard } from 'app/components';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from "envConfig";

// // STYLED COMPONENTS
// const ButtonLayoutRoot = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
//   },
//   '& .button-grid': {
//     padding: theme.spacing(4),
//   },
// }));

// // Individual Button Component
// const DynamicButton = ({ label, onClick }) => (
//   <Button variant="contained" color="primary" onClick={onClick}>
//     {label}
//   </Button>
// );

// export default function ButtonLayout() {
//   const [open, setOpen] = useState(false);
//   const [labName, setLabName] = useState('');
//   const [numSystems, setNumSystems] = useState('');
//   const [buttons, setButtons] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [formError, setFormError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const navigate = useNavigate();

//   // Fetch user role and labs on mount
//   useEffect(() => {
//     const fetchLabsAndRole = async () => {
//       try {
//         const header = {
//           Authorization: "Bearer " + localStorage.getItem('token'),
//         };
        
//         const storedRole = localStorage.getItem('role'); 
//         setUserRole(storedRole);
        
//         const response = await axios.get(`${BASE_URL}/labs/all`, { headers: header });
//         setButtons(response.data.data.map(lab => ({ label: lab.labName, path: lab.path })));
//       } catch (error) {
//         console.error('Error fetching labs or role:', error);
//         setFormError('Could not fetch labs or role. Please try again later.');
//       }
//     };

//     fetchLabsAndRole();
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setLabName('');
//     setNumSystems('');
//     setFormError('');
//   };

//   const handleSubmit = async () => {
//     if (!labName || !numSystems || isNaN(numSystems) || numSystems <= 0) {
//       setFormError('Lab name and a valid number of systems are required');
//       return;
//     }

//     setLoading(true);
//     const newButton = { label: labName, path: `/labs/${labName}` };

//     try {
//       const header = {
//         Authorization: "Bearer " + localStorage.getItem('token'),
//       };

//       const pcCoordinates = Array(parseInt(numSystems, 10)).fill({ x: 0, y: 0 });
//       await axios.post(`${BASE_URL}/labs/add-lab`, 
//         { labName, numSystems: parseInt(numSystems, 10), pcCoordinates }, 
//         { headers: header }
//       );

//       await axios.post(`${BASE_URL}/labs/create-lab-layout`, 
//         { labName, numSystems: parseInt(numSystems, 10) }, 
//         { headers: header }
//       );

//       setButtons((prevButtons) => [...prevButtons, newButton]);
//       setSuccessMessage('Lab added and layout created successfully!');
//     } catch (error) {
//       console.error('Error adding lab or creating layout:', error);
//       setFormError(error.response?.data?.message || 'An error occurred while adding the lab');
//     } finally {
//       setLoading(false);
//       handleClose();
//     }
//   };

//   return (
//     <ButtonLayoutRoot>
//       <Box className="breadcrumb">
//         <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Labs' }]} />
//       </Box>

//       <SimpleCard title="Button Layout">
//         <Box className="button-grid">
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item>
//               <Grid container spacing={2}>
//                 {buttons.map((button) => (
//                   <Grid item key={button.label}>
//                     <DynamicButton label={button.label} onClick={() => navigate(button.path)} />
//                   </Grid>
//                 ))}
//               </Grid>
//               <Box height={20} />
            
//               {userRole === 'Coordinator' && (
//                 <>
//                 <Button variant="contained" color="secondary" onClick={handleClickOpen}>
//                   Add New Lab
//                 </Button>
//                  <Button variant="contained" color="secondary" >
//                  Delete Lab
//                </Button>
//                </>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       </SimpleCard>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Lab</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Lab Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={labName}
//             onChange={(e) => setLabName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Number of Systems"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={numSystems}
//             onChange={(e) => setNumSystems(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit} disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {successMessage && <div>{successMessage}</div>}
//       {formError && <div style={{ color: 'red' }}>{formError}</div>}
//     </ButtonLayoutRoot>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from '@mui/material';
// import { Breadcrumb, SimpleCard } from 'app/components';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from "envConfig";

// // STYLED COMPONENTS
// const ButtonLayoutRoot = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
//   },
//   '& .button-grid': {
//     padding: theme.spacing(4),
//   },
// }));

// // Individual Button Component
// const DynamicButton = ({ label, onClick }) => (
//   <Button variant="contained" color="primary" onClick={onClick}>
//     {label}
//   </Button>
// );

// export default function ButtonLayout() {
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [labName, setLabName] = useState('');
//   const [numSystems, setNumSystems] = useState('');
//   const [buttons, setButtons] = useState([]);
//   const [deleteLabName, setDeleteLabName] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [formError, setFormError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const navigate = useNavigate();

//   // Fetch user role and labs on mount
//   useEffect(() => {
//     const fetchLabsAndRole = async () => {
//       try {
//         const header = {
//           Authorization: "Bearer " + localStorage.getItem('token'),
//         };
        
//         const storedRole = localStorage.getItem('role'); 
//         setUserRole(storedRole);
        
//         const response = await axios.get(`${BASE_URL}/labs/all`, { headers: header });
//         setButtons(response.data.data.map(lab => ({ label: lab.labName, path: lab.path })));
//       } catch (error) {
//         console.error('Error fetching labs or role:', error);
//         setFormError('Could not fetch labs or role. Please try again later.');
//       }
//     };

//     fetchLabsAndRole();
//   }, []);

//   const handleOpenAdd = () => {
//     setOpenAdd(true);
//   };

//   const handleCloseAdd = () => {
//     setOpenAdd(false);
//     setLabName('');
//     setNumSystems('');
//     setFormError('');
//   };

//   const handleOpenDelete = () => {
//     setOpenDelete(true);
//   };

//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//     setDeleteLabName('');
//     setFormError('');
//   };

//   const handleSubmitAdd = async () => {
//     if (!labName || !numSystems || isNaN(numSystems) || numSystems <= 0) {
//       setFormError('Lab name and a valid number of systems are required');
//       return;
//     }

//     setLoading(true);
//     const newButton = { label: labName, path: `/labs/${labName}` };

//     try {
//       const header = {
//         Authorization: "Bearer " + localStorage.getItem('token'),
//       };

//       const pcCoordinates = Array(parseInt(numSystems, 10)).fill({ x: 0, y: 0 });
//       await axios.post(`${BASE_URL}/labs/add-lab`, 
//         { labName, numSystems: parseInt(numSystems, 10), pcCoordinates }, 
//         { headers: header }
//       );

//       await axios.post(`${BASE_URL}/labs/create-lab-layout`, 
//         { labName, numSystems: parseInt(numSystems, 10) }, 
//         { headers: header }
//       );

//       setButtons((prevButtons) => [...prevButtons, newButton]);
//       setSuccessMessage('Lab added and layout created successfully!');
//     } catch (error) {
//       console.error('Error adding lab or creating layout:', error);
//       setFormError(error.response?.data?.message || 'An error occurred while adding the lab');
//     } finally {
//       setLoading(false);
//       handleCloseAdd();
//     }
//   };

//   const handleSubmitDelete = async () => {
//     if (!deleteLabName) {
//       setFormError('Lab name is required for deletion');
//       return;
//     }

//     setLoading(true);

//     try {
//       const header = {
//         Authorization: "Bearer " + localStorage.getItem('token'),
//       };

//       await axios.delete(`${BASE_URL}/labs/${deleteLabName}`, { headers: header });

//       setButtons((prevButtons) => prevButtons.filter((button) => button.label !== deleteLabName));
//       setSuccessMessage(`Lab "${deleteLabName}" deleted successfully!`);
//     } catch (error) {
//       console.error('Error deleting lab:', error);
//       setFormError(error.response?.data?.message || 'An error occurred while deleting the lab');
//     } finally {
//       setLoading(false);
//       handleCloseDelete();
//     }
//   };

//   return (
//     <ButtonLayoutRoot>
//       <Box className="breadcrumb">
//         <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Labs' }]} />
//       </Box>

//       <SimpleCard title="Button Layout">
//         <Box className="button-grid">
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item>
//               <Grid container spacing={2}>
//                 {buttons.map((button) => (
//                   <Grid item key={button.label}>
//                     <DynamicButton label={button.label} onClick={() => navigate(button.path)} />
//                   </Grid>
//                 ))}
//               </Grid>
//               <Box height={20} />
            
//               {userRole === 'Coordinator' && (
//                 <>
//                   <Button variant="contained" color="secondary" onClick={handleOpenAdd}>
//                     Add New Lab
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={handleOpenDelete}>
//                     Delete Lab
//                   </Button>
//                 </>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       </SimpleCard>

//       {/* Add Lab Modal */}
//       <Dialog open={openAdd} onClose={handleCloseAdd}>
//         <DialogTitle>Add New Lab</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Lab Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={labName}
//             onChange={(e) => setLabName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Number of Systems"
//             type="number"
//             fullWidth
//             variant="standard"
//             value={numSystems}
//             onChange={(e) => setNumSystems(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseAdd}>Cancel</Button>
//           <Button onClick={handleSubmitAdd} disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Lab Modal */}
//       <Dialog open={openDelete} onClose={handleCloseDelete}>
//         <DialogTitle>Delete Lab</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Lab Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={deleteLabName}
//             onChange={(e) => setDeleteLabName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDelete}>Cancel</Button>
//           <Button onClick={handleSubmitDelete} disabled={loading}>
//             {loading ? 'Deleting...' : 'Delete'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {successMessage && <div>{successMessage}</div>}
//       {formError && <div style={{ color: 'red' }}>{formError}</div>}
//     </ButtonLayoutRoot>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "envConfig";

// STYLED COMPONENTS
const ButtonLayoutRoot = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .button-grid': {
    padding: theme.spacing(4),
  },
}));

// Individual Button Component
const DynamicButton = ({ label, onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    {label}
  </Button>
);

export default function ButtonLayout() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [labName, setLabName] = useState('');
  const [numSystems, setNumSystems] = useState('');
  const [buttons, setButtons] = useState([]);
  const [deleteLabName, setDeleteLabName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Fetch user role and labs on mount
  useEffect(() => {
    const fetchLabsAndRole = async () => {
      try {
        const header = {
          Authorization: "Bearer " + localStorage.getItem('token'),
        };
        
        const storedRole = localStorage.getItem('role'); 
        setUserRole(storedRole);
        
        const response = await axios.get(`${BASE_URL}/labs/all`, { headers: header });
        setButtons(response.data.data.map(lab => ({ label: lab.labName, path: lab.path })));
      } catch (error) {
        console.error('Error fetching labs or role:', error);
        setFormError('Could not fetch labs or role. Please try again later.');
      }
    };

    fetchLabsAndRole();
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setLabName('');
    setNumSystems('');
    setFormError('');
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteLabName('');
    setFormError('');
  };

  const handleSubmitAdd = async () => {
    if (!labName || !numSystems || isNaN(numSystems) || numSystems <= 0) {
      setFormError('Lab name and a valid number of systems are required');
      return;
    }

    setLoading(true);
    const newButton = { label: labName, path: `/labs/${labName}` };

    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem('token'),
      };

      const pcCoordinates = Array(parseInt(numSystems, 10)).fill({ x: 0, y: 0 });
      await axios.post(`${BASE_URL}/labs/add-lab`, 
        { labName, numSystems: parseInt(numSystems, 10), pcCoordinates }, 
        { headers: header }
      );

      await axios.post(`${BASE_URL}/labs/create-lab-layout`, 
        { labName, numSystems: parseInt(numSystems, 10) }, 
        { headers: header }
      );

      setButtons((prevButtons) => [...prevButtons, newButton]);
      setSuccessMessage('Lab added and layout created successfully!');
    } catch (error) {
      console.error('Error adding lab or creating layout:', error);
      setFormError(error.response?.data?.message || 'An error occurred while adding the lab');
    } finally {
      setLoading(false);
      handleCloseAdd();
    }
  };

  const handleSubmitDelete = async () => {
    // Check if lab name is provided
    if (!deleteLabName) {
      setFormError('Lab name is required for deletion');
      return;
    }
  
    setLoading(true);
  
    try {
      const header = {
        Authorization: "Bearer " + localStorage.getItem('token'),
      };
  
      // Check if the lab exists
      const response = await axios.delete(`${BASE_URL}/labs/${deleteLabName}`, { headers: header });
  
      // If lab does not exist, set error and return
      if (!response.data.exists) {
        setFormError('Lab name does not exist in the database.');
        return; // Do not proceed further
      }
  
      // If lab exists, proceed with deletion
      await axios.delete(`${BASE_URL}/labs/${deleteLabName}`, { headers: header });
  
      setButtons((prevButtons) => prevButtons.filter((button) => button.label !== deleteLabName));
      setSuccessMessage(`Lab "${deleteLabName}" deleted successfully!`);
    } catch (error) {
      console.error('Error deleting lab:', error);
      setFormError(error.response?.data?.message || 'Lab not exist..');
    } finally {
      setLoading(false);
      // Ensure to close the modal only after handling errors
      // Do not close if there is an error
      if (!formError) handleCloseDelete();
    }
  };
  
  
  

  return (
    <ButtonLayoutRoot>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dashboard', path: '/' }, { name: 'Labs' }]} />
      </Box>

      <SimpleCard title="Button Layout">
        <Box className="button-grid">
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Grid container spacing={2}>
                {buttons.map((button) => (
                  <Grid item key={button.label}>
                    <DynamicButton label={button.label} onClick={() => navigate(button.path)} />
                  </Grid>
                ))}
              </Grid>
              <Box height={20} />
            
              {userRole === 'Coordinator' && (
                <>
                  <Button variant="contained" color="secondary" onClick={handleOpenAdd}>
                    Add New Lab
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleOpenDelete} sx={{ml:31}}>
                    Delete Lab
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </SimpleCard>

           {/* Add Lab Modal */}
           <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New Lab</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Lab Name"
            type="text"
            fullWidth
            variant="standard"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Number of Systems"
            type="number"
            fullWidth
            variant="standard"
            value={numSystems}
            onChange={(e) => setNumSystems(e.target.value)}
          />
          {formError && <div style={{ color: 'red', marginTop: '10px' }}>{formError}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button onClick={handleSubmitAdd} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

{/* Delete Lab Confirmation Modal */}
<Dialog open={openDelete} onClose={handleCloseDelete}>
  <DialogTitle>Delete Lab</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Lab Name"
      type="text"
      fullWidth
      variant="standard"
      value={deleteLabName}
      onChange={(e) => setDeleteLabName(e.target.value)}
    />
    {formError && <div style={{ color: 'red', marginTop: '10px' }}>{formError}</div>}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDelete}>Cancel</Button>
    <Button onClick={handleSubmitDelete} >Delete
      {/* {loading ? 'Deleting...' : 'Delete'} */}
    </Button>
  </DialogActions>
</Dialog>



      {successMessage && <div>{successMessage}</div>}
      {formError && <div style={{ color: 'red' }}>{formError}</div>}
    </ButtonLayoutRoot>
  );
}
