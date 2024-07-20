import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import api from "../api"
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constants';
const theme = createTheme();

const LoginForm = ({route}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError,setIsError]=useState(false);
    const navigate=useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('getToken/', { username, password });
            localStorage.setItem(ACCESS_TOKEN,response.data.access);
            localStorage.setItem(REFRESH_TOKEN,response.data.refresh);
            console.log('it should be stored');
            console.log(response.data.access);
            console.log(response.data.refresh);
            navigate('/home')
            // Handle successful login here (e.g., save token, redirect)
        } catch (error) {
            setIsError(true)
            console.error(error);
            // Handle login error here
        }
    };

    return (
        // <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            />
                            {isError && (
                          <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
                            There is some error. Check login password.
                          </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        // </ThemeProvider>
    );
};

export default LoginForm;
