import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TweetCard from '../components/TweetCard';
import api from '../api';
import TweetModal from '../components/TweetModal';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tweetModalToDisplay, setTweetModalToDisplay] = useState(null); // Changed to null

  const getAllTweets = async () => {
    try {
      const response = await api.get('/api/tweets/');
      setTweets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const deleteTweet = (tweetId) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== tweetId);
    setTweets(updatedTweets);
  };

  const handleModalOpen = (tweet) => {
    setTweetModalToDisplay(tweet); // Pass the tweet directly
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button component={RouterLink} to="/createTweet" variant="contained" color="primary">
              Create Tweet
            </Button>
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
            Tweets
          </Typography>
          <Grid container spacing={4}>
            {tweets.map((tweet) => (
              <Grid item key={tweet.id} xs={12} sm={6} md={4}>
                <TweetCard tweet={tweet} onDelete={deleteTweet} onClick={() => handleModalOpen(tweet)} />
              </Grid>
            ))}
          </Grid>
        </Container>
        {tweetModalToDisplay && (
          <TweetModal open={modalOpen} handleClose={handleModalClose} tweet={tweetModalToDisplay} />
        )}
      </Box>
    </>
  );
};

export default Home;
