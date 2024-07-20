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
import DetailsIcon from '@mui/icons-material/Details';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../api';

const CreateTweetForm = ({ route }) => {
    const [text, settext] = useState('');
    const [title, setTitle] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/api/tweets/create/', { title,text:text });
            // onTweetCreated(response.data);
            // settext('');
            // setOpenSnackbar(true);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                <DetailsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Create Title
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Title"
                    label="Title"
                    name="Title"
                    autoComplete="Title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="text"
                    label="text"
                    id="text"
                    autoComplete="text"
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Tweet
                </Button>
            </Box>
        </Box>
    </Container>
    );
};

export default CreateTweetForm;
