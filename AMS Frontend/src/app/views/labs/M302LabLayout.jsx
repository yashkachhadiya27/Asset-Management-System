
    import React, { useState, useEffect } from 'react';
    import { Box, Grid, IconButton, Paper, Tooltip, Typography, Button } from '@mui/material';
    import { Breadcrumb, SimpleCard } from 'app/components';
    import { styled } from '@mui/system';
    import { DndProvider, useDrag } from 'react-dnd';
    import { HTML5Backend } from 'react-dnd-html5-backend';
    import ComputerIcon from '@mui/icons-material/Computer';
    import MemoryIcon from '@mui/icons-material/Memory';
    import KeyboardIcon from '@mui/icons-material/Keyboard';
    import MouseIcon from '@mui/icons-material/Mouse';
    import ChairIcon from '@mui/icons-material/Chair';
    import axios from 'axios';
    import { BASE_URL } from 'envConfig'; // Replace with your config

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
        position: 'relative',
        height: '500px',
        border: '1px solid #ccc',
        marginTop: theme.spacing(4),
      },
    }));

    const RotatedPaper = styled(Paper)(({ top, left }) => ({
      position: 'absolute',
      width: 100,
      top: `${top}px`,
      left: `${left}px`,
      cursor: 'move',
    }));

    // PC component with icons and drag-and-drop functionality
    const PC = ({ index, top, left, movePC, isEditMode }) => {
      const [, drag] = useDrag({
        type: 'PC',
        item: { index, top, left },
        canDrag: isEditMode,
        end: (item, monitor) => {
          const delta = monitor.getDifferenceFromInitialOffset();
          if (item && delta) {
            const newLeft = Math.round(item.left + delta.x);
            const newTop = Math.round(item.top + delta.y);
            movePC(item.index, newTop, newLeft);
          }
        },
      });

      const handleClick = (componentName) => {
        alert(`Clicked on: ${componentName}`);
      };

      return (
        <RotatedPaper ref={drag} top={top} left={left}>
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
      );
    };

    export default function M302LabLayout() {
      const [isEditMode, setEditMode] = useState(false);
      const [pcPositions, setPcPositions] = useState([...Array(20)].map(() => ({ top: 0, left: 0 })));
      const [userRole, setUserRole] = useState('');

      // Fetch positions from the database on mount
      useEffect(() => {
        const fetchLabLayout = async () => {
          try {
          const headers = {
      Authorization: "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    };
            const response = await axios.get(`${BASE_URL}/labs/M302/layout`,{ headers });
            setPcPositions(response.data.data || pcPositions);
            const storedRole = localStorage.getItem('role');
        setUserRole(storedRole);
          } catch (error) {
            console.error('Error fetching lab layout:', error);
          }
        };
        fetchLabLayout();
      },[]);

      const movePC = (index, newTop, newLeft) => {
        setPcPositions((prevPositions) => {
          const updatedPositions = [...prevPositions];
          updatedPositions[index] = { top: newTop, left: newLeft };
          return updatedPositions;
        });
      };

      const saveLayout = async () => {
        try {
        const headers = {
      Authorization: "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/json', // Optional: Specify content type
    };
          await axios.put(`${BASE_URL}/labs/M302/layout`, { pcPositions },{ headers });
          setEditMode(false); // Exit edit mode after saving
        } catch (error) {
          console.error('Error saving layout:', error);
        }
      };

      return (
        <LabLayoutRoot>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: 'Labs', path: '/labs' }, { name: 'M302' }]} />
          </Box>

          <SimpleCard title="M302">
           {userRole === 'Coordinator' && (
            <Button variant="contained" onClick={() => (isEditMode ? saveLayout() : setEditMode(true))}>
              {isEditMode ? 'Save Layout' : 'Edit Layout'}
            </Button>
            )}
            <Box className="lab-grid">
              <DndProvider backend={HTML5Backend}>
                <Grid container spacing={2}>
                  {pcPositions.map((pos, index) => (
                    <Grid item style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                      <PC index={index} top={pos.top} left={pos.left} movePC={movePC} isEditMode={isEditMode} />
                    </Grid>
                  ))}
                </Grid>
              </DndProvider>
            </Box>
          </SimpleCard>
        </LabLayoutRoot>
      );
    }
    