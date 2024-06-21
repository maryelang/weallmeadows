import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  Container,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Grid,
  Typography,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase'; // Ensure this path is correct

export default function StocksAndSupplies() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pharmaceuticalSupplies, setPharmaceuticalSupplies] = useState([]);
  const [surgicalAndNonSurgicalSupplies, setSurgicalAndNonSurgicalSupplies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchDrugs();
    fetchSupplies();
  }, [selectedCategory]);

  useEffect(() => {
    console.log('Wards state:', surgicalAndNonSurgicalSupplies);
  }, [surgicalAndNonSurgicalSupplies]);

  async function fetchItems() {
    try {
      const { data, error } = await supabase.from('surgical_and_non_surgical_supplies').select('*');
      if (error) {
        console.error('Error fetching items:', error.message);
        return;
      }
      console.log('Fetched items:', data);
      setSurgicalAndNonSurgicalSupplies(data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  }

  async function fetchDrugs() {
    try {
      const { data, error } = await supabase.from('pharmaceutical_supplies').select('*');
      if (error) {
        console.error('Error fetching pharmaceutical:', error.message);
        return;
      }
      console.log('Fetched pharmaceutical:', data);
      setPharmaceuticalSupplies(data);
    } catch (error) {
      console.error('Error fetching pharmaceutical:', error.message);
    }
  }

  async function fetchSupplies() {
    try {
      const { data, error } = await supabase.from('suppliers').select('*');
      if (error) {
        console.error('Error fetching suppliers:', error.message);
        return;
      }
      console.log('Fetched suppliers:', data);
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error.message);
    }
  }


  const filteredSurgicalAndNonSurgicalSupplies = surgicalAndNonSurgicalSupplies.filter((surgical_and_non_surgical) =>
    (typeof surgical_and_non_surgical.itemnumber === 'string' && surgical_and_non_surgical.itemnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.itemname === 'string' && surgical_and_non_surgical.itemname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.itemdescription === 'string' && surgical_and_non_surgical.itemdescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.quantityinstock === 'string' && surgical_and_non_surgical.quantityinstock.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.reorderlevel === 'string' && surgical_and_non_surgical.reorderlevel.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.costperunit === 'string' && surgical_and_non_surgical.costperunit.includes(searchQuery))
  );

  const filteredPharmaceuticalSupplies = pharmaceuticalSupplies.filter((pharmaceutical_supplies) =>
    (typeof pharmaceutical_supplies.drugnumber === 'string' && pharmaceutical_supplies.drugnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.drugname === 'string' && pharmaceutical_supplies.drugname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.drugdescription === 'string' && pharmaceutical_supplies.drugdescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.drugdosage === 'string' && pharmaceutical_supplies.drugdosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.methodofadmin === 'string' && pharmaceutical_supplies.methodofadmin.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.quantityinstock === 'string' && pharmaceutical_supplies.quantityinstock.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.reorderlevel === 'string' && pharmaceutical_supplies.reorderlevel.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.costperunit === 'string' && pharmaceutical_supplies.costperunit.includes(searchQuery))
  );

  const filteredSuppliers = suppliers.filter((supplier) =>
    (typeof supplier.suppliernumber === 'string' && supplier.suppliernumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.suppliername === 'string' && supplier.suppliername.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.supplieraddress === 'string' && supplier.supplieraddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.telephonenumber === 'string' && supplier.telephonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.faxnumber === 'string' && supplier.faxnumber.toLowerCase().includes(searchQuery.toLowerCase())) 
   
  );


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (content) => {
    console.log(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    console.log('Saving changes...');
    handleCloseDialog();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };




  const renderTable = () => {
    switch (selectedCategory) {
      case 'Surgical and Non-Surgical':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Number</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Cost Per Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSurgicalAndNonSurgicalSupplies.map((item) => (
                <TableRow key={item.itemnumber}>
                  <TableCell>{item.itemnumber}</TableCell>
                  <TableCell>{item.itemname}</TableCell>
                  <TableCell>{item.itemdescription}</TableCell>
                  <TableCell>{item.quantityinstock}</TableCell>
                  <TableCell>{item.reorderlevel}</TableCell>
                  <TableCell>{item.costperunit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Pharmaceutical':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Drug Number</TableCell>
                <TableCell>Drug Name</TableCell>
                <TableCell>Drug Description</TableCell>
                <TableCell>Drug Dosage</TableCell>
                <TableCell>Method of Administration</TableCell>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Cost Per Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPharmaceuticalSupplies.map((drug) => (
                <TableRow key={drug.drugnumber}>
                  <TableCell>{drug.drugnumber}</TableCell>
                  <TableCell>{drug.drugname}</TableCell>
                  <TableCell>{drug.drugdescription}</TableCell>
                  <TableCell>{drug.drugdosage}</TableCell>
                  <TableCell>{drug.methodofadmin}</TableCell>
                  <TableCell>{drug.quantityinstock}</TableCell>
                  <TableCell>{drug.reorderlevel}</TableCell>
                  <TableCell>{drug.costperunit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Suppliers':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier Number</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Supplier Address</TableCell>
                <TableCell>Telephone Number</TableCell>
                <TableCell>Fax Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.suppliernumber}>
                  <TableCell>{supplier.suppliernumber}</TableCell>
                  <TableCell>{supplier.suppliername}</TableCell>
                  <TableCell>{supplier.supplieraddress}</TableCell>
                  <TableCell>{supplier.telephonenumber}</TableCell>
                  <TableCell>{supplier.faxnumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return <Typography>Please select a category to view the table.</Typography>;
    }
  };

  return (
    <Container maxWidth="false">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={() => handleCategoryClick('Surgical and Non-Surgical')}>
            Surgical and Non-Surgical
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleCategoryClick('Pharmaceutical')}>
            Pharmaceutical
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleCategoryClick('Suppliers')}>
            Suppliers
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2}>
          <Box style={{ marginBottom: '16px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Available Stocks and Supplies</Typography>
            <TextField
              variant="outlined"
              placeholder="Search"
              sx={{ borderRadius: 1, ml: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2,
                },
              }}
              onChange={handleSearch}
            />
          </Box>
          <Divider />
          {renderTable()}
        </Paper>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={() => handleEditClick('Add Stocks')}>
          Add Stocks
        </Button>
      </Box>

      

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Staff Assignment</DialogTitle>
        <DialogContent>
          {/* Add form fields or content for editing */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
