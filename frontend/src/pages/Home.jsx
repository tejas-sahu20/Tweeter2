import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography, Fab } from '@mui/material';
import TweetCard from '../components/TweetCard';
import api from '../api';
import TweetModal from '../components/TweetModal';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; // Import the AddIcon

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tweetModalToDisplay, setTweetModalToDisplay] = useState(null);

  const getAllTweets = async () => {
    try {
      const response = await api.get('/api/tweets/');
      const tweetsWithReversedComments = response.data.map(tweet => ({
        ...tweet,
        comments: tweet.comments.slice().reverse() // reverse comments for each tweet
      }));
      setTweets(tweetsWithReversedComments.reverse());
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
    setTweetModalToDisplay(null); // Clear the modal data first
    setTimeout(() => {
      setTweetModalToDisplay(tweet); // Set the modal data after a brief delay
      setModalOpen(true);
    }, 0);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTweetModalToDisplay(null); // Clear the modal data on close
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
            Shouts
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
          <TweetModal
            open={modalOpen}
            handleClose={handleModalClose}
            tweet={tweetModalToDisplay}
            newComment={getAllTweets}
          />
        )}
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        component={RouterLink}
        to="/createTweet"
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 200,
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Home;
