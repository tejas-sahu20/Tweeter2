import React from 'react';
import { Box, Typography } from '@mui/material';

const TweetCard = ({ tweet }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
        padding: 2,
        borderRadius: 8,
        boxShadow: 2, // Light shadow
        color: 'white',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {tweet.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {tweet.text}
      </Typography>
      <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
        Author: {tweet.author}
      </Typography>
      <Typography variant="caption">
        Created at: {new Date(tweet.created_at).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default TweetCard;
