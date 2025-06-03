import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import {
  fetchCustomer,
  clearError,
  clearCurrentCustomer
} from '../store/slices/customerSlice';

function CustomerDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCustomer: customer, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomer(id));
    return () => {
      dispatch(clearError());
      dispatch(clearCurrentCustomer());
    };
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'lead':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
          sx={{ mt: 2 }}
        >
          Back to Customers
        </Button>
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box>
        <Typography>Customer not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
          sx={{ mt: 2 }}
        >
          Back to Customers
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
        >
          Back to Customers
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/customers/${id}/edit`)}
        >
          Edit Customer
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">{customer.name}</Typography>
              <Chip
                label={customer.status}
                color={getStatusColor(customer.status)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Contact Information
            </Typography>
            <Box mt={1}>
              <Typography variant="body1">
                <strong>Email:</strong> {customer.email}
              </Typography>
              {customer.phone && (
                <Typography variant="body1">
                  <strong>Phone:</strong> {customer.phone}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Company Information
            </Typography>
            <Box mt={1}>
              {customer.company ? (
                <Typography variant="body1">
                  <strong>Company:</strong> {customer.company}
                </Typography>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No company information
                </Typography>
              )}
            </Box>
          </Grid>

          {customer.notes && (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Notes
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                  {customer.notes}
                </Typography>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Additional Information
            </Typography>
            <Box mt={1}>
              <Typography variant="body2" color="text.secondary">
                Created: {new Date(customer.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date(customer.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CustomerDetails; 