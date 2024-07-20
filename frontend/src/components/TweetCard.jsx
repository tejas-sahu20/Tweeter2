import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment'; // Import CommentIcon
import api from '../api';
import LikeButton from './LikeButton'; // Import the LikeButton component

const TweetCard = ({ tweet, onDelete, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const deleteTheTweet = async () => {
    try {
      await api.delete(`api/tweets/${tweet.id}/delete`);
      onDelete(tweet.id);
    } catch (error) {
      console.log('Error deleting tweet:', error);
    }
  };

  const showDeleteCall = async () => {
    try {
      const resp = await api.get('api/tweets/showDeleteButton', { params: { id: tweet.id } });
      setShowDelete(resp.data.show === 1);
    } catch (error) {
      console.log('Error fetching delete button visibility:', error);
    }
  };

  const getCommentCount = async () => {
    try {
      // const resp = await api.get(`api/tweets/commentsCount?tweet_id=${tweet.id}`);
      setCommentCount(tweet.comments.length); // Ensure `count` matches your backend response
    } catch (error) {
      console.log('Error fetching comment count:', error);
    }
  };

  useEffect(() => {
    showDeleteCall();
    getCommentCount();
  }, [tweet]);

  return (
     <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 2,
        borderRadius: 8,
        boxShadow: 2,
        color: 'white',
        width: '300px', 
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            onClick={() => onClick(tweet)}
          />
        </Box>
      )}

      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', cursor: 'pointer' }} onClick={() => onClick(tweet)}>
        {tweet.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, textAlign: 'center', cursor: 'pointer' }} onClick={() => onClick(tweet)}>
        {tweet.text.substr(0, 100)}...
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 2,
          px: 1, // Add horizontal padding for spacing
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LikeButton
            tweetId={tweet.id}
            initialLikeCount={tweet.Likes ? tweet.Likes.length : 0}
            initialLiked={tweet.Likes ? tweet.Likes.includes(/* current user id */) : false}
            onLikeChange={() => {}}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            onClick={() => onClick(tweet)}
          >
            <CommentIcon />
            <Typography variant="body2" sx={{ cursor: 'pointer', ml: 1 }}>
              {commentCount}
            </Typography>
          </IconButton>
        </Box>
        {showDelete && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              onClick={deleteTheTweet}
              sx={{
                color: 'white',
                backgroundColor: '#d32f2f', // Custom color
                '&:hover': {
                  backgroundColor: '#b71c1c', // Darker shade on hover
                },
                borderRadius: '50%',
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TweetCard;
