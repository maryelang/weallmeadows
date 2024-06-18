import React, { useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import supabase from '../Services/Supabase';

const StaffAllocation = () => {
  const [wardStaffAllocation, setWardStaffAllocation] = useState([]);
  const [staffAllocs, setStaffAllocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({ staffnumber: '', wardnumber: '', shift: '', week: '' });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStaffAlloc();
  }, []);

  async function fetchStaffAlloc() {
    try {
      const { data, error } = await supabase.from('staff_allocation').select('*');
      if (error) {
        console.error('Error fetching staff allocation lists:', error.message);
        return;
      }
      setStaffAllocs(data || []);
    } catch (error) {
      console.error('Error fetching staff allocation lists:', error.message);
    }
  }

  async function fetchWardStaffAllocation() {
    try {
      const { data, error } = await supabase.rpc('get_staff_allocated_to_ward', { ward_id: parseInt(newStaff.wardnumber, 10) });
  
      if (error) {
        console.error('Error fetching staff allocation:', error.message);
        return;
      }
  
      console.log('Data fetched:', data);
      setWardStaffAllocation(data || []);
    } catch (error) {
      console.error('Error fetching staff allocation:', error.message);
    }
  }

  async function addStaffAllocation() {
    try {
      const existingStaff = staffAllocs.find(staff => staff.staffnumber === newStaff.staffnumber);
      if (existingStaff) {
        setError('Staff number already exists.');
        return;
      }
      
      const { data, error } = await supabase.from('staff_allocation').insert([newStaff]);
      if (error) {
        console.error('Error adding staff allocation:', error.message);
        return;
      }
      console.log('New staff allocation added:', data);
      setStaffAllocs(prevAllocs => [...prevAllocs, { ...newStaff }]);
      handleCloseDialog();
      setError('');
    } catch (error) {
      console.error('Error adding staff allocation:', error.message);
    }
  }

  async function updateStaffAllocation() {
    try {
      const updatedStaff = { ...newStaff };
      delete updatedStaff.id;
      
      const { data, error } = await supabase.from('staff_allocation').update(updatedStaff).eq('staffnumber', newStaff.staffnumber);
      if (error) {
        console.error('Error updating staff allocation:', error.message);
        return;
      }
      console.log('Staff allocation updated:', data);
      const updatedAllocs = staffAllocs.map((alloc, index) =>
        index === editIndex ? { ...updatedStaff } : alloc
      );
      setStaffAllocs(updatedAllocs);
      handleCloseDialog();
      setError('');
    } catch (error) {
      console.error('Error updating staff allocation:', error.message);
    }
  }

  const handleOpenDialog = (staff, index) => {
    setEditMode(true);
    setOpenDialog(true);
    setNewStaff({ ...staff });
    setEditIndex(index);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewStaff({ staffnumber: '', wardnumber: '', shift: '', week: '' });
    setEditMode(false);
    setEditIndex(null);
    setError('');
  };

  const handleSave = () => {
    if (newStaff.staffnumber && newStaff.wardnumber) {
      editMode ? updateStaffAllocation() : addStaffAllocation();
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStaff = staffAllocs.filter((staff) => {
    const staffNumber = staff.staffnumber ? staff.staffnumber.toString().toLowerCase() : '';
    const wardNumber = staff.wardnumber ? staff.wardnumber.toString() : '';

    return (
      staffNumber.includes(searchQuery.toLowerCase()) ||
      wardNumber.includes(searchQuery)
    );
  });

  return (
    <Container maxWidth="false" sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            color: 'white',
            width: '150px',
            padding: '12px 24px',
            backgroundColor: 'green',
            '&:hover': {
              backgroundColor: 'darkgreen',
            },
          }}
          onClick={() => {
            setOpenDialog(true);
            setEditMode(false);
            setNewStaff({ staffnumber: '', wardnumber: '', shift: '', week: '' });
          }}
        >
          Add
        </Button>
      </Box>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box
            style={{
              marginBottom: '16px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Staff Assignment</Typography>
            <TextField
              variant="outlined"
              placeholder="Search"
              sx={{ borderRadius: 1, ml: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={fetchWardStaffAllocation}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2,
                },
              }}
              onChange={handleSearchChange}
            />
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Staff number</TableCell>
                  <TableCell>Ward number</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Weekly Rota</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.map((staff, index) => (
                  <TableRow key={`${staff.staffnumber}-${index}`}>
                    <TableCell>{staff.staffnumber}</TableCell>
                    <TableCell>{staff.wardnumber}</TableCell>
                    <TableCell>{staff.shift}</TableCell>
                    <TableCell>{staff.week}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleOpenDialog(staff, index)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Staff Allocation' : 'Add Staff Allocation'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Staff Number"
            value={newStaff.staffnumber}
            onChange={(e) => setNewStaff({ ...newStaff, staffnumber: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Ward Number"
            value={newStaff.wardnumber}
            onChange={(e) => setNewStaff({ ...newStaff, wardnumber: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Shift"
            value={newStaff.shift}
            onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Weekly Rota"
            value={newStaff.week}
            onChange={(e) => setNewStaff({ ...newStaff, week: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
            {editMode ? 'Save Changes' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StaffAllocation;
