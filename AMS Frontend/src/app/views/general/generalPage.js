// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Grid, Typography, Box } from "@mui/material";
// import { styled } from "@mui/system";
// import { Line } from "react-chartjs-2";
// import { BASE_URL } from "envConfig";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const StyledBox = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(3),
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//     padding: theme.spacing(3),
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     cursor: "pointer",
//     "&:hover": {
//         backgroundColor: theme.palette.grey[200],
//     },
// }));

// const IconBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 50,
//     height: 50,
//     borderRadius: "50%",
//     backgroundColor: theme.palette.primary.light,
// }));

// export const GeneralPage = () => {
//     const [mouseData, setMouseData] = useState({});
//     const [cpuData, setCpuData] = useState({});
//     const [keyboardData, setKeyboardData] = useState({});
//     const [monitorData, setMonitorData] = useState({});
//     const [aioData, setAioData] = useState({});
//     const [mouseCount, setMouseCount] = useState(0);
//     const [cpuCount, setCpuCount] = useState(0);
//     const [keyboardCount, setKeyboardCount] = useState(0);
//     const [monitorCount, setMonitorCount] = useState(0);
//     const [aioCount, setAioCount] = useState(0);

//     const calculateTotalPerYear = (data) => {
//         return Object.values(data).reduce((acc, curr) => acc + curr, 0);
//     };

//     const fetchCounts = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const config = { headers: { Authorization: `Bearer ${token}` } };

//             const responses = await Promise.all([
//                 axios.get(`${BASE_URL}/dashboard/getMouseCount`, config),
//                 axios.get(`${BASE_URL}/dashboard/getCPUCount`, config),
//                 axios.get(`${BASE_URL}/dashboard/getKeyboardCount`, config),
//                 axios.get(`${BASE_URL}/dashboard/getMonitorCount`, config),
//                 axios.get(`${BASE_URL}/dashboard/getAIOCount`, config),
//             ]);

//             if (responses.every(response => response.data.success)) {
//                 setMouseData(responses[0].data.data || {});
//                 setCpuData(responses[1].data.data || {});
//                 setKeyboardData(responses[2].data.data || {});
//                 setMonitorData(responses[3].data.data || {});
//                 setAioData(responses[4].data.data || {});

//                 setMouseCount(calculateTotalPerYear(responses[0].data.data));
//                 setCpuCount(calculateTotalPerYear(responses[1].data.data));
//                 setKeyboardCount(calculateTotalPerYear(responses[2].data.data));
//                 setMonitorCount(calculateTotalPerYear(responses[3].data.data));
//                 setAioCount(calculateTotalPerYear(responses[4].data.data));
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCounts();
//     }, []);

//     const transformDataForChart = (data) => {
//         const years = Object.keys(data);
//         const counts = Object.values(data);
//         return {
//             labels: years,
//             datasets: [
//                 {
//                     label: "Count",
//                     data: counts,
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 },
//             ],
//         };
//     };

//     const cardData = [
//         { id: 1, title: "Mouse Count", count: mouseCount, icon: "mouse" },
//         { id: 2, title: "CPU Count", count: cpuCount, icon: "memory" },
//         { id: 3, title: "Keyboard Count", count: keyboardCount, icon: "keyboard" },
//         { id: 4, title: "Monitor Count", count: monitorCount, icon: "monitor" },
//         { id: 5, title: "AIO Count", count: aioCount, icon: "computer" },
//     ];

//     return (
//         <div>
//             <Grid container spacing={2} ml={0.5} mt={2} mr={0.5}>
//                 {cardData.map((card) => (
//                     <Grid item xs={12} sm={6} md={4} key={card.id}>
//                         <StyledCard onClick={() => console.log(`Card clicked: ${card.title}`)}>
//                             <Box>
//                                 <Typography variant="h6" color="textSecondary">
//                                     {card.title}
//                                 </Typography>
//                                 <Typography variant="h5" color="primary">
//                                     {card.count}
//                                 </Typography>
//                             </Box>
//                             <IconBox>
//                                 <span className="material-icons" style={{ color: "#fff" }}>
//                                     {card.icon}
//                                 </span>
//                             </IconBox>
//                         </StyledCard>
//                     </Grid>
//                 ))}
//             </Grid>

//             <Grid container spacing={2} ml={0.5} mt={2} mr={0.5}>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StyledBox>
//                         <Typography variant="h6" color="textSecondary">
//                             Mouse Count (Year-wise)
//                         </Typography>
//                         <Line data={transformDataForChart(mouseData)} />
//                     </StyledBox>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StyledBox>
//                         <Typography variant="h6" color="textSecondary">
//                             CPU Count (Year-wise)
//                         </Typography>
//                         <Line data={transformDataForChart(cpuData)} />
//                     </StyledBox>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StyledBox>
//                         <Typography variant="h6" color="textSecondary">
//                             Keyboard Count (Year-wise)
//                         </Typography>
//                         <Line data={transformDataForChart(keyboardData)} />
//                     </StyledBox>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StyledBox>
//                         <Typography variant="h6" color="textSecondary">
//                             Monitor Count (Year-wise)
//                         </Typography>
//                         <Line data={transformDataForChart(monitorData)} />
//                     </StyledBox>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StyledBox>
//                         <Typography variant="h6" color="textSecondary">
//                             AIO Count (Year-wise)
//                         </Typography>
//                         <Line data={transformDataForChart(aioData)} />
//                     </StyledBox>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Bar } from "react-chartjs-2";
import { BASE_URL } from "envConfig";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.grey[200],
    },
}));

const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.light,
}));

export const GeneralPage = () => {
    const [mouseData, setMouseData] = useState({});
    const [cpuData, setCpuData] = useState({});
    const [keyboardData, setKeyboardData] = useState({});
    const [monitorData, setMonitorData] = useState({});
    const [aioData, setAioData] = useState({});
    const [mouseCount, setMouseCount] = useState(0);
    const [cpuCount, setCpuCount] = useState(0);
    const [keyboardCount, setKeyboardCount] = useState(0);
    const [monitorCount, setMonitorCount] = useState(0);
    const [aioCount, setAioCount] = useState(0);

    const calculateTotalPerYear = (data) => {
        return Object.values(data).reduce((acc, curr) => acc + curr, 0);
    };

    const fetchCounts = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const responses = await Promise.all([
                axios.get(`${BASE_URL}/dashboard/getMouseCount`, config),
                axios.get(`${BASE_URL}/dashboard/getCPUCount`, config),
                axios.get(`${BASE_URL}/dashboard/getKeyboardCount`, config),
                axios.get(`${BASE_URL}/dashboard/getMonitorCount`, config),
                axios.get(`${BASE_URL}/dashboard/getAIOCount`, config),
            ]);

            if (responses.every(response => response.data.success)) {
                setMouseData(responses[0].data.data || {});
                setCpuData(responses[1].data.data || {});
                setKeyboardData(responses[2].data.data || {});
                setMonitorData(responses[3].data.data || {});
                setAioData(responses[4].data.data || {});

                setMouseCount(calculateTotalPerYear(responses[0].data.data));
                setCpuCount(calculateTotalPerYear(responses[1].data.data));
                setKeyboardCount(calculateTotalPerYear(responses[2].data.data));
                setMonitorCount(calculateTotalPerYear(responses[3].data.data));
                setAioCount(calculateTotalPerYear(responses[4].data.data));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    const transformDataForChart = (data) => {
        const years = Object.keys(data);
        const counts = Object.values(data);
        return {
            labels: years,
            datasets: [
                {
                    label: "Count",
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const cardData = [
        { id: 1, title: "Mouse Count", count: mouseCount, icon: "mouse" },
        { id: 2, title: "CPU Count", count: cpuCount, icon: "memory" },
        { id: 3, title: "Keyboard Count", count: keyboardCount, icon: "keyboard" },
        { id: 4, title: "Monitor Count", count: monitorCount, icon: "monitor" },
        { id: 5, title: "AIO Count", count: aioCount, icon: "computer" },
    ];

    return (
        <div>
            <Grid container spacing={2} ml={0.5} mt={2} mr={0.5} pr={3}>
                {cardData.map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card.id}>
                        <StyledCard onClick={() => console.log(`Card clicked: ${card.title}`)}>
                            <Box>
                                <Typography variant="h6" color="textSecondary">
                                    {card.title}
                                </Typography>
                                <Typography variant="h5" color="primary">
                                    {card.count}
                                </Typography>
                            </Box>
                            <IconBox>
                                <span className="material-icons" style={{ color: "#fff" }}>
                                    {card.icon}
                                </span>
                            </IconBox>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2} ml={0.5} mt={2} mr={0.5} pl={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledBox>
                        <Typography variant="h6" color="textSecondary">
                            Mouse Count (Year-wise)
                        </Typography>
                        <Bar data={transformDataForChart(mouseData)} />
                    </StyledBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledBox>
                        <Typography variant="h6" color="textSecondary">
                            CPU Count (Year-wise)
                        </Typography>
                        <Bar data={transformDataForChart(cpuData)} />
                    </StyledBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledBox>
                        <Typography variant="h6" color="textSecondary">
                            Keyboard Count (Year-wise)
                        </Typography>
                        <Bar data={transformDataForChart(keyboardData)} />
                    </StyledBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledBox>
                        <Typography variant="h6" color="textSecondary">
                            Monitor Count (Year-wise)
                        </Typography>
                        <Bar data={transformDataForChart(monitorData)} />
                    </StyledBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledBox>
                        <Typography variant="h6" color="textSecondary">
                            AIO Count (Year-wise)
                        </Typography>
                        <Bar data={transformDataForChart(aioData)} />
                    </StyledBox>
                </Grid>
            </Grid>
        </div>
    );
};
