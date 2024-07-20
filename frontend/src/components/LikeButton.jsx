// LikeButton.js
import React, { useState, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing'; // Import HearingIcon
import api from '../api';

const LikeButton = ({ tweetId, initialLikeCount, initialLiked, onLikeChange }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const checkLiked = async () => {
    try {
      const resp = await api.get(`api/tweets/toggleLike?tweet_id=${tweetId}`);
      setLiked(resp.data.contains === 1);
    } catch (error) {
      console.log('Error checking like status:', error);
    }
  };

  const likeTweet = async () => {
    try {
      await api.post(`api/tweets/toggleLike?tweet_id=${tweetId}`);
      setLikeCount(likeCount + (liked ? -1 : 1)); // Toggle like count
      setLiked(!liked); // Toggle the like status
      if (onLikeChange) onLikeChange();
    } catch (error) {
      console.log('Error liking tweet:', error);
    }
  };

  useEffect(() => {
    checkLiked();
  }, [tweetId]);

  return (
    <IconButton
      onClick={likeTweet}
      sx={{
        color: liked ? '#3f51b5' : 'white',
        backgroundColor: liked ? 'rgba(63, 81, 181, 0.2)' : 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
        },
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        mr: 2, // Add margin-right to separate icons
      }}
    >
      <HearingIcon />
      <Typography variant="body2" sx={{ cursor: 'pointer', ml: 1 }}>
        {likeCount}
      </Typography>
    </IconButton>
  );
};

export default LikeButton;
