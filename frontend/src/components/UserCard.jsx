// UserCard.js
import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const UserCard = ({ user }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 2,
        borderRadius: 8,
        boxShadow: 2,
        color: 'white',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {user.username}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        {user.first_name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
        <IconButton
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserCard;
