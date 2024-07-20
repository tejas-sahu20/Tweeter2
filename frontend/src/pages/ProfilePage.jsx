import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemText, IconButton ,Fab} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import api from '../api';
import HearingIcon from '@mui/icons-material/Hearing'; // For like icon if needed
import CommentIcon from '@mui/icons-material/Comment'; // For comment icon if needed

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/api/user/fetchUserDetails`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 2, maxWidth: '800px', margin: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Avatar sx={{ width: 100, height: 100, marginRight: 2 }} />
        <Box>
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body2">{user.first_name}</Typography>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>My Tweets</Typography>
      <Box>
        {user.tweets.map(tweet => (
          <Box
            key={tweet.id}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: 2,
              borderRadius: 8,
              boxShadow: 2,
              color: 'white',
              mb: 2, // Margin bottom for spacing between tweets
            }}
          >
            {tweet.image && (
              <Box
                mb={2}
                sx={{
                  width: '100%', // Ensures the Box takes full width
                  height: '200px', // Fixed height for the image container
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={tweet.image}
                  alt={tweet.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                />
              </Box>
            )}
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {tweet.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
              {tweet.text}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(63, 81, 181, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(63, 81, 181, 0.4)',
                  },
                  borderRadius: '50%',
                }}
              >
                <HearingIcon />
                <Typography variant="body2" sx={{ cursor: 'pointer', ml: 1 }}>
                  {tweet.Likes ? tweet.Likes.length : 0}
                </Typography>
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(63, 81, 181, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(63, 81, 181, 0.4)',
                  },
                  borderRadius: '50%',
                }}
              >
                <CommentIcon />
                <Typography variant="body2" sx={{ cursor: 'pointer', ml: 1 }}>
                  {tweet.Comments ? tweet.Comments.length : 0}
                </Typography>
              </IconButton>
            </Box>
          </Box>
        ))}
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
    </Box>
  );
};

export default ProfilePage;
