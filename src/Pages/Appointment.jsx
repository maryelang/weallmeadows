import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Box, InputAdornment, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../Services/Supabase';
import { useNavigate } from 'react-router-dom';

const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};


const Appointment = () => {
  const navigate = useNavigate();
  const currentDateAndTime = new Date().toISOString();
  const [openDialog, setOpenDialog] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  //for appointment
  const [newAppointment, setNewAppointment] = useState({
    staffNumber: '',
    clinicNumber: '',
    examinationRoom: '',
  });

  //for registering a patient
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    address: '',
    telephoneNumber: '',
    dateOfBirth: '',
    sex: '',
    maritalStatus: '',
    nokFullName: '',
    relationship: '',
    nokAddress: '',
    nokTelephoneNumber: ''
  });

  const startConsult = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenRegistrationDialog(true);
  };

  const handleAddClick = () => {
    setSelectedAppointment(null);
    setNewAppointment({ staffNumber: '', clinicNumber: '', examinationRoom: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseRegistrationDialog = () => {
    setOpenRegistrationDialog(false);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);


  const handleSave = async () => {
    try {
      const dataToSave = {
        staffnumber: newAppointment.staffNumber,
        clinicnumber: newAppointment.clinicNumber,
        examinationroom: newAppointment.examinationRoom,
        dateandtime: currentDateAndTime,
      };
  
      const { data, error } = await supabase
        .from('patient_appointment')
        .insert(dataToSave)
        .select(); // Ensure the inserted data is returned
  
      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Patient appointment added:", data);
        if (data && data.length > 0) {
          alert("Appointment successfully added!");
          handleCloseDialog();
          await fetchAppointments(); // Ensure appointments are fetched after adding a new one
        } else {
          alert("Failed to add appointment.");
        }
      }
    } catch (error) {
      console.error('Error saving appointment:', error.message);
    }
  };
  

  const handleSavePatient = async () => {
    setConfirmationDialogOpen(true);
  };

  const confirmSavePatient = async () => {
    try {
      const dataToSave = {
        p_firstname: newPatient.firstName,
        p_lastname: newPatient.lastName,
        p_address: newPatient.address,
        p_telephoneNumber: newPatient.telephoneNumber,
        p_dateofbirth: newPatient.dateOfBirth,
        p_sex: newPatient.sex,
        p_maritalstatus: newPatient.maritalStatus,
        p_dateregistered: new Date().toISOString(),
        p_fullname: newPatient.nokFullName,
        p_relationship: newPatient.relationship,
        p_nok_address: newPatient.nokAddress,
        p_nok_telephonenumber: newPatient.nokTelephoneNumber,
        p_clinicnumber: selectedAppointment,
      

       
      };
  
      console.log("Data to save:", dataToSave); // Add this debugging statement
  
      const { data, error } = await supabase.rpc('patient_registration_form', dataToSave);
  
      if (error) {
        console.error('Error saving patient:', error.message);
        return;
      }
  
      console.log("RPC response:", data); // Add this debugging statement
  
      handleCloseRegistrationDialog();
      setConfirmationDialogOpen(false);
      navigate('/dashboard/patient/allPatientLists'); // Navigate to patient lists page
    } catch (error) {
      console.error('Error saving patient:', error.message);
    }
  };
  
  const handleDelete = async (appointmentnumber) => {
    try {
      const { error } = await supabase
        .from('patient_appointment')
        .delete()
        .eq('appointmentnumber', appointmentnumber);
      if (error) {
        console.error('Error deleting appointment:', error.message);
        return;
      }
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
    }
  };

  const handleUpdate = (appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      staffNumber: appointment.staffnumber,
      clinicNumber: appointment.clinicnumber,
      examinationRoom: appointment.examinationroom,
    });
    setOpenDialog(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase(); 
    setSearchQuery(value);
    const filtered = appointments.filter((appointment) =>
      Object.values(appointment).some(val =>
        String(val).toLowerCase().includes(value)
      )
    );
    setFilteredAppointments(filtered);
  };

 
  async function fetchAppointments() {
    try {
      const { data, error } = await supabase
        .from('patient_appointment')
        .select('*');
      if (error) {
        console.error('Error fetching appointment lists:', error.message);
        return;
      }
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      console.error('Error fetching appointment lists:', error.message);
    }
  }

  return (
    <Container display="flex" sx={{ mt: -5, mb: 2 }}>
      <Grid container spacing={5} justifyContent="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ borderRadius: 3, ml: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2,
                  fontSize: '14px',
                },
              }}
            />
          </Box>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
                onClick={handleAddClick}
              >
                Add
              </Button>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', ml: 'auto', width: '100%' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={verticalLine}>Appointment Number</TableCell>
                        <TableCell sx={verticalLine}>Staff Number</TableCell>
                        <TableCell sx={verticalLine}>Clinic Number</TableCell>
                        <TableCell sx={verticalLine}>Date and Time</TableCell>
                        <TableCell sx={verticalLine}>Examination Room</TableCell>
                        <TableCell sx={{ verticalLine, textAlign: 'center' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredAppointments.map((appointmentRecs) => (
                        <TableRow key={appointmentRecs.appointmentnumber}>
                          <TableCell sx={verticalLine}>{appointmentRecs?.appointmentnumber}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.staffnumber}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.clinicnumber}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.dateandtime}</TableCell>
                          <TableCell sx={verticalLine}>{appointmentRecs.examinationroom}</TableCell>
                          <TableCell sx={verticalLine}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Button
                                onClick={() => startConsult(appointmentRecs)}
                                sx={{
                                  width: '150px',
                                  backgroundColor: '#0288d1',
                                  '&:hover': { backgroundColor: '#193b4d' },
                                  borderRadius: '5px',
                                  color: 'white',
                                  mr: 1,
                                  mb: 1,
                                  fontSize: '0.70rem',
                                }}
                              >
                                Start Consultation
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for Add/Update functionality */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{selectedAppointment ? 'Update' : 'Add'} Patient Appointment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Staff Number"
            name="staffNumber"
            value={newAppointment.staffNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Clinic Number"
            name="clinicNumber"
            value={newAppointment.clinicNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Examination Room"
            name="examinationRoom"
            value={newAppointment.examinationRoom}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Patient Registration */}
      <Dialog open={openRegistrationDialog} onClose={handleCloseRegistrationDialog} fullWidth maxWidth="sm">
        <DialogTitle>Register Patient</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            name="firstName"
            value={newPatient.firstName}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={newPatient.lastName}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Address"
            name="address"
            value={newPatient.address}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Telephone Number"
            name="telephoneNumber"
            value={newPatient.telephoneNumber}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Date of Birth"
            name="dateOfBirth"
            value={newPatient.dateOfBirth}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Sex"
            name="sex"
            value={newPatient.sex}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Marital Status"
            name="maritalStatus"
            value={newPatient.maritalStatus}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Next of Kin Full Name"
            name="nokFullName"
            value={newPatient.nokFullName}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Relationship"
            name="relationship"
            value={newPatient.relationship}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Next of Kin Address"
            name="nokAddress"
            value={newPatient.nokAddress}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Next of Kin Telephone Number"
            name="nokTelephoneNumber"
            value={newPatient.nokTelephoneNumber}
            onChange={handlePatientInputChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegistrationDialog}>Cancel</Button>
          <Button onClick={handleSavePatient} variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onClose={handleCloseConfirmationDialog} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Box>Do you want to save this form?</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog}>No</Button>
          <Button onClick={confirmSavePatient} variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Appointment;