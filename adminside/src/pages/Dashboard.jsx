import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography } from "@mui/material";
import GraphChart from '../components/GraphChart';
import BarChart from '../components/BarChart';
import api from '../axios/axios';
import { useMediaQuery } from '@mui/material';
const Dashboard = () => {
  const [dashBoard, setDashBoard] = useState([]);
  const isMobile = useMediaQuery('(max-width: 600px)');
  useEffect(() => {
    api.get('/admin/dashboard').then(({ data }) => {
      console.log(data);
      setDashBoard(data)

    })
  }, [])
  const {
    TodayAmount,
    moneyGeneratedPerWeek,
    totalAmount,
    totalBookingPerDay,
    totalNumberOfProperty, } = dashBoard

  const totalBooking = {
    labels: totalBookingPerDay && Array.isArray(totalBookingPerDay) ? totalBookingPerDay.map((item) => item._id) : [0,0,0],
    datasets: [
      {
        label: "BookingsPerDay",
        data: totalBookingPerDay && Array.isArray(totalBookingPerDay) ? totalBookingPerDay.map((item) => item.total) : [0,0,],
        backgroundColor: ["#404040"],
      },
    ],
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#000000",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue</Typography>
            <Typography mt={1} variant="h5">
              {totalAmount}
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: '#404040',
              color: "white",
            }}
          >
            <Typography variant="h5">Total Number Of Property Listed</Typography>
            <Typography mt={1} variant="h5">
              {totalNumberOfProperty}
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#7f7f7f",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue Week</Typography>
            <Typography mt={1} variant="h5">
              ₹{moneyGeneratedPerWeek}
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#bfbfbf",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue Today</Typography>
            <Typography mt={1} variant="h5">
              ₹{TodayAmount}
            </Typography>
          </Card>
        </Grid>
        <Box width='auto' height={250} />
        <Grid item xs={12} lg={6}>
          <Box width={isMobile ? 300 : 500} p={1}>
            <BarChart
              chartData={totalBooking}
            />
          </Box>
        </Grid>
        <Grid item xs={12}  lg={6}>
          <Box width={isMobile ? 300 : 500} p={1}>
            <GraphChart
              chartData={totalBooking}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;