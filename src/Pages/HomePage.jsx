import React, { useRef } from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AvahImage from '../Images/avah.png';
import MarrielleImage from '../Images/maryel.png';
import MarkImage from '../Images/mark.png';
import backgroundImage from '../Images/bgbg.jpg'; // Import the background image

const Home = () => {
  const aboutUsRef = useRef(null);
  const teamRef = useRef(null);
  const loginRef = useRef(null); // Define loginRef

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {/* Use Link component to navigate to Login and SignUp */}
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" onClick={() => handleScroll(aboutUsRef)}>About Us</Button>
            <Button color="inherit" onClick={() => handleScroll(teamRef)}>Team</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'cent   er',
          alignItems: 'center',
          marginTop: 2,
        }}
      ></Box>

      <Container maxWidth="sm" sx={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ whiteSpace: 'nowrap', fontFamily: 'Poppins', mb: 1 }} >
          Welcome to Wellmeadows Hospital
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Discover excellence in healthcare at Wellmeadows Hospital, where we blend compassionate patient care with innovative medical solutions. Our dedicated team strives to ensure your well-being every step of the way.
        </Typography>
      </Container>

      <Container ref={loginRef} maxWidth="sm" style={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      </Container>

      <Container ref={teamRef}>
          <Typography variant="h5" align="center" gutterBottom  sx={{fontFamily: 'Poppins, sans-serif'}}>
            OUR TEAM:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} align="center">
              <Paper elevation={3} style={{ padding: 10, borderRadius: '50%', overflow: 'hidden' }}>
                <Box
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={AvahImage}
                    alt="Avah Ayop"
                    sx={{
                      width: '80%',
                      height: 'auto',
                    }}
                  />
                </Box>
              </Paper>
              <Typography variant="h6" align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>Avah Ayop</Typography>
            </Grid>
            <Grid item xs={12} sm={4} align="center">
              <Paper elevation={3} style={{ padding: 10, borderRadius: '50%', overflow: 'hidden' }}>
                <Box
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={MarrielleImage}
                    alt="Marrielle Anne Sumunod"
                    sx={{
                      width: '80%',
                      height: 'auto',
                    }}
                  />
                </Box>
              </Paper>
              <Typography variant="h6" align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>Marrielle Anne Sumunod</Typography>
            </Grid>
            <Grid item xs={12} sm={4} align="center">
              <Paper elevation={3} style={{ padding: 10, borderRadius: '50%', overflow: 'hidden' }}>
                <Box
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={MarkImage}
                    alt="Mark Rey Allanic"
                    sx={{
                      width: '80%',
                      height: 'auto',
                    }}
                  />
                </Box>
              </Paper>
              <Typography variant="h6" align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>Mark Rey Allanic</Typography>
            </Grid>
          </Grid>
      </Container>

      <Container ref={aboutUsRef} maxWidth="sm" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{fontFamily: 'Poppins, sans-serif'}}>
          About us:
        </Typography>
        <Typography variant="body1" align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>
          Welcome to Wellmeadows Hospital
        </Typography>
        <Typography variant="body1" align="center" sx={{fontFamily: 'Poppins, sans-serif'}}>
          Wellmeadows Hospital has been a cornerstone
          of healthcare in our community for over 50 years. 
          Our mission is to provide exceptional medical care with compassion, 
          respect, and a commitment to excellence. We believe in treating 
          every patient as a unique individual, ensuring their physical, 
          emotional, and spiritual needs are met.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;