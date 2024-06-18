import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import supabase from '../Services/Supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('something went wrong');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const login = async () => {
        
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
    
            if (error) {
                setIsError(true);
                setErrorMessage('Invalid email or password');
                console.error('Error during sign-in:', error.message);
            } else if (data) {
                if (data.user) {
                    navigate('/dashboard');
                } else {
                    setIsError(true);
                    setErrorMessage('Invalid email or password');
                    console.error('Error fetching user details: No user data returned');
                }
            }
        
    };
    

    const handleCloseSnackbar = () => {
        setIsError(false);
    };

    return (
        <Container maxWidth="xs" className="formContainer">
            <Box component="form" noValidate autoComplete="off">
                <Typography variant="h5" component="h1" gutterBottom>
                    Login Form
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{ style: { fontSize: 14 } }} // Adjust the font size of the input
                    InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size of the label
                />
                <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        style: { fontSize: 14 }, // Adjust the font size of the input
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size of the label
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={login}
                    sx={{
                        mt: 2,
                        mb: 2,
                        height: 50, // increase the height
                        fontSize: 'h6', // increase the font size
                        backgroundColor: '#0288d1',
                        '&:hover': { backgroundColor: '#01579b' },
                    }}
                >
                    Login
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Link to="/SignUp" underline="none">Register</Link>
                </Typography>
            </Box>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
