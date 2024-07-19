import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails ,Button} from '@mui/material';
// import {DeleteIcon} from 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/icons-material/Delete';
import api from '../api';

const TweetCard = ({ tweet, onDelete, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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

  useEffect(() => {
    showDeleteCall();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 2,
        borderRadius: 8,
        boxShadow: 2,
        color: 'white',
        cursor: 'pointer',
      }}
      onClick={() => onClick(tweet)} // Pass the tweet to onClick
    >
        {tweet.image && (
          <Box mb={2}>
            <img
              src={tweet.image}
              alt={tweet.title}
              style={{ maxWidth: '100%', maxHeight: '400px', display: 'block', margin: '0 auto' }}
            />
          </Box>
        )}
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {tweet.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {tweet.text}
      </Typography>
      {showDelete && (
              <IconButton
                onClick={deleteTheTweet}
                sx={{
                  color: 'white',
                  backgroundColor: '#d32f2f', // Custom color
                  '&:hover': {
                    backgroundColor: '#b71c1c', // Darker shade on hover
                  },
                  borderRadius: '50%',
                  marginTop: 2,
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
    </Box>
  );
};

export default TweetCard;
