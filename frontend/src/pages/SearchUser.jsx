import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CssBaseline, TextField } from '@mui/material';
import api from '../api';
import UserCard from '../components/UserCard';
import HomeButton from '../components/HomeButton';

const SearchUser = () => {
  const [users, setUsers] = useState([]); 
  const [searchText, setSearchText] = useState(''); // State for search term

  const getAllUsers = async () => {
    try {
      const resp = await api.get('/api/user/getAllUsers');
    //   console.log('hereasdlkm')
      setUsers(resp.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
//   console.log(searchText)
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <TextField
        margin="normal"
        required
        fullWidth
        id="search" 
        label="Search Users" 
        name="search"
        autoComplete="off"
        autoFocus
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.toLowerCase())} // Lowercase search term for case-insensitive search
      />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          User List
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, width: '100%' }}>
                {users.map((user) => (
        user.username.includes(searchText) ? (
            <UserCard key={user.id} user={user} />
        ) : null
        ))}
          {users.length === 0 && searchText !== '' && ( // Show message if no search results
            <Typography variant="body2" color="error">
              No users found for "{searchText}".
            </Typography>
          )}
        </Box>
      </Box>
      <HomeButton/>
    </Container>
  );
};

export default SearchUser;
