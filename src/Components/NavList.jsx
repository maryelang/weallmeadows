import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FeedIcon from '@mui/icons-material/Feed';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@mui/icons-material';


export default function MainListItems() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <React.Fragment>



      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/staffAlloc" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Staff Allocation" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/patientMed" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Patient Medication" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/wardReq" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <FeedIcon />
          </ListItemIcon>
          <ListItemText primary="Ward Requisitions" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/localDoctors" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          <ListItemText primary="Local Doctors" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/stocksAndSupplies" style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Stocks and Supplies" />
        </ListItemButton>
      </Link>

      
      <ListItemButton
        color="inherit"
        onClick={handleLogout}
        sx={{ position: 'absolute', bottom: 0 }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}
