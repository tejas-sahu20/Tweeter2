import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../api';

const TweetCard = ({ tweet ,onDelete}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  
  const deleteTheTweet = async (tweet) => {
    try {
      const response = await api.delete(`api/tweets/${tweet.id}/delete`);
      onDelete(tweet.id)
      // Optionally handle success message or update state after deletion
    } catch (error) {
      console.log('Error deleting tweet:', error);
    }
  }

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
      <Accordion
        expanded={expanded}
        onChange={toggleAccordion}
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} // Remove default background and shadow
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="tweet-details-content"
          id="tweet-details-header"
          sx={{ minWidth: 'unset', padding: 0 }} // Adjust width and padding of summary
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              Click to view details
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 2, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="caption">
              Author: {tweet.author}
            </Typography>
            <Typography variant="caption">
              Created at: {new Date(tweet.created_at).toLocaleString()}
            </Typography>
            <button onClick={() => deleteTheTweet(tweet)}>Delete</button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TweetCard;
