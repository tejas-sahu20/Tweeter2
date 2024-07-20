import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
    Fab
} from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import api from '../api';


const CreateTweetForm = ({ route }) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await api.post('/api/tweets/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/home');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
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
                        padding: 2,
                        boxSizing: 'border-box',
                        overflow: 'hidden', // Hide any overflowing content
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <DetailsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Say your Shout
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt: 1,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2 // Add spacing between elements
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="text"
                            label="Text"
                            id="text"
                            autoComplete="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ width: '100%' }} // Full width to fit container
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Make a Shout
                        </Button>
                    </Box>
                </Box>
                <Fab
                    color="primary"
                    aria-label="back"
                    component={RouterLink}
                    to="/home"
                    sx={{
                        position: 'fixed',
                        bottom: 16, // Adjust to fit within viewport
                        right: 16,  // Adjust to fit within viewport
                    }}
                >
                    <ArrowBackIosIcon />
                </Fab>
            </Container>
    );
};

export default CreateTweetForm;
