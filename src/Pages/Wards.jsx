import * as React from 'react';
import { useState } from 'react';
import { Container, Grid, Paper, MenuItem, Select, FormControl, InputLabel, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Divider, Box } from '@mui/material';
import supabase from '../Services/Supabase'; // Assuming this is correctly configured

export default function Wards() {
  const [wardNumber, setWardNumber] = React.useState('');
  const [availableBeds, setAvailableBeds] = React.useState(null);

  const handleWardChange = async (event) => {
    const selectedWard = event.target.value;
    setWardNumber(selectedWard);
    fetchAvailableBeds(selectedWard);
  };

  const fetchAvailableBeds = async (wardNumber) => {
    try {
      const { data, error } = await supabase.rpc('GetAvailableBedsByWardNumber', { p_ward_number: wardNumber });
      if (error) {
        throw error;
      }
      setAvailableBeds(data.getavailablebeds); // Assuming the stored procedure returns a single value for available beds
    } catch (error) {
      console.error('Error fetching available beds:', error.message);
    }
  };

  return (
    <Container display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControl variant="outlined" sx={{ minWidth: 200, mr: 2 }}>
                <InputLabel>Ward Number</InputLabel>
                <Select
                  value={wardNumber}
                  onChange={handleWardChange}
                  label="Ward Number"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* Replace hardcoded values with data from the WARD table */}
                  {[...Array(18).keys()].map((wardNumber) => (
                    <MenuItem key={wardNumber + 1} value={wardNumber + 1}>
                      {wardNumber + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ward Number</TableCell>
                    <TableCell>Available Beds</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{wardNumber}</TableCell>
                    <TableCell>{availableBeds !== null ? availableBeds : 'Loading...'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
