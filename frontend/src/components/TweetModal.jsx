import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TweetModal = ({ open, handleClose, tweet }) => {
  if (!tweet) return null; // Return nothing if tweet is null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {tweet.title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          {tweet.text}
        </Typography>
        <Box mt={2}>
          <Typography variant="caption" display="block">
            Author: {tweet.author}
          </Typography>
          <Typography variant="caption" display="block">
            Created at: {new Date(tweet.created_at).toLocaleString()}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TweetModal;
