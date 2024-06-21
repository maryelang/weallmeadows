import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Box,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../Services/Supabase';

const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};

const PatientLists = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('Error fetching patient lists:', error.message);
        return;
      }
      setPatients(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching patient lists', error.message);
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Selected Ward:', selectedWard);
    handleCloseDialog();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.patientnumber.toString().includes(searchQuery) ||
    patient.clinicnumber.toString().includes(searchQuery)
  );

  return (
    <TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Patient lists
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ ml: 2, borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2, // Adding borderRadius
            },
          }}
        />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={verticalLine}>Patient number</TableCell>
              <TableCell sx={verticalLine}>Clinic number</TableCell>
              <TableCell sx={verticalLine}>Appointment number</TableCell>
              <TableCell sx={verticalLine}>First name</TableCell>
              <TableCell sx={verticalLine}>Last name</TableCell>
              <TableCell sx={verticalLine}>Address</TableCell>
              <TableCell sx={verticalLine}>Telephone number</TableCell>
              <TableCell sx={verticalLine}>Date of birth</TableCell>
              <TableCell sx={verticalLine}>Sex</TableCell>
              <TableCell sx={verticalLine}>Marital Status</TableCell>
              <TableCell sx={verticalLine}>Date registered</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.patientnumber}>
                <TableCell sx={verticalLine}>{patient.patientnumber}</TableCell>
                <TableCell sx={verticalLine}>{patient.clinicnumber}</TableCell>
                <TableCell sx={verticalLine}>{patient.appointmentnumber}</TableCell>
                <TableCell sx={verticalLine}>{patient.firstname}</TableCell>
                <TableCell sx={verticalLine}>{patient.lastname}</TableCell>
                <TableCell sx={verticalLine}>{patient.address}</TableCell>
                <TableCell sx={verticalLine}>{patient.telephonenumber}</TableCell>
                <TableCell sx={verticalLine}>{patient.dateofbirth}</TableCell>
                <TableCell sx={verticalLine}>{patient.sex}</TableCell>
                <TableCell sx={verticalLine}>{patient.maritalstatus}</TableCell>
                <TableCell sx={verticalLine}>{patient.dateregistered}</TableCell>
                </TableRow>
            ))}
            {/* Additional rows can be added here */}
          </TableBody>
        </Table>
      </TableContainer>
      
    </TableContainer>
  );
};

export default PatientLists;
