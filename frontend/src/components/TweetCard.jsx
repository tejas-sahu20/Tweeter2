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
        width: '300px', // Set your desired fixed width for the box
        height: '400px', // Set your desired fixed height for the box
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onClick={() => onClick(tweet)} // Pass the tweet to onClick
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
      
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' ,cursor: 'pointer',}} onClick={() => onClick(tweet)}>
        {tweet.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' ,cursor: 'pointer'}} onClick={() => onClick(tweet)}>
        {tweet.text.substr(0,100)}...
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
}  

export default TweetCard;
