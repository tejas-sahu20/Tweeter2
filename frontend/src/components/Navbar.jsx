// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Optional, if you want a menu icon
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ username }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shout Phone
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button sx={{ marginRight:2 }} component={RouterLink} to="/createTweet" variant="contained" color="primary">
              Shout your Heart
            </Button>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Welcome, {username}
        </Typography>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/logout">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
