import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { fetchCustomers } from '../store/slices/customerSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2'
    },
    {
      title: 'Active Customers',
      value: customers.filter(c => c.status === 'active').length,
      icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32'
    },
    {
      title: 'Companies',
      value: new Set(customers.map(c => c.company).filter(Boolean)).size,
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02'
    }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: `${stat.color}15`,
                  color: stat.color,
                  mb: 2
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 2 }}>
          {customers.length > 0 ? (
            customers.slice(0, 5).map((customer) => (
              <Box
                key={customer._id}
                sx={{
                  py: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' }
                }}
              >
                <Typography variant="subtitle1">
                  {customer.name} - {customer.company || 'No Company'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {customer.status}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary" align="center">
              No customers found
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard; 