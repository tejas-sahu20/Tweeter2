import React, { useState, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import api from '../api';

const CommentButton = ({ tweetId, initialCommentCount, onCommentChange ,onClick}) => {
  const [commentCount, setCommentCount] = useState(initialCommentCount);

  const getCommentCount = async () => {
    try {
      const resp = await api.get(`api/tweets/commentsCount?tweet_id=${tweetId}`);
      setCommentCount(resp.data.count); // Ensure `count` matches your backend response
    } catch (error) {
      console.log('Error fetching comment count:', error);
    }
  };

  useEffect(() => {
    getCommentCount();
  }, [tweetId]);

  return (
    <IconButton
      sx={{
        color: 'white',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light hover effect
        },
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={onClick()}
    >
      <CommentIcon />
      <Typography variant="body2" sx={{ cursor: 'pointer', ml: 1 }}>
        {commentCount}
      </Typography>
    </IconButton>
  );
};

export default CommentButton;
