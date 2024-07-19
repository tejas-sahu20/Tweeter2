import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api';

const TweetModal = ({ open, handleClose, tweet }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(tweet.comments || []);

  const onSubmitComment = async (tweet_id, commentText) => {
    try {
      const resp = await api.post('api/comments/create/', {
        text: commentText,
        tweet_id: tweet_id,
      });
      setComments([...comments, resp.data]);
      setComment(''); // Clear the input after submission
    } catch (error) {
      console.log('Error posting comment:', error);
    }
  };

  if (!tweet) return null; // Return nothing if tweet is null

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    onSubmitComment(tweet.id, comment);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          margin: 0,
          height: '100vh',
          maxHeight: 'none',
          borderRadius: 2, // Rounded corners
          width: '100%', // Adjust width to cover full screen
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {tweet.title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 4, overflowY: 'auto' }}>
        {tweet.image && (
          <Box mb={2}>
            <img
              src={tweet.image}
              alt={tweet.title}
              style={{ maxWidth: '100%', maxHeight: '400px', display: 'block', margin: '0 auto' }}
            />
          </Box>
        )}
        <Typography variant="body1" gutterBottom>
          {tweet.text}
        </Typography>
        <Box mt={2}>
          <Typography variant="caption" display="block" gutterBottom>
            Author: {tweet.author}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Created at: {new Date(tweet.created_at).toLocaleString()}
          </Typography>
        </Box>
        <Box mt={4}>
          <TextField
            id="outlined-basic"
            label="Comment on this tweet"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Button
            onClick={handleCommentSubmit}
            color="primary"
            variant="contained"
          >
            Post Comment
          </Button>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <Grid container spacing={2}>
            {comments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: 2,
                    borderRadius: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {comment.author}: {comment.text}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {new Date(comment.created_at).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TweetModal;
