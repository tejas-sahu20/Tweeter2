import {Box,Fab, IconButton} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const HomeButton=()=>{
    return <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(63, 81, 181, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(63, 81, 181, 0.4)',
                  },
                  borderRadius: '50%',
                }}
              ></IconButton>
    <Fab
        color="primary"
        aria-label="back"
        component={RouterLink}
        to="/home"
        sx={{
          position: 'fixed',
          bottom: 16, // Adjust to fit within viewport
          right: 16,  // Adjust to fit within viewport
        }}
      >
        <ArrowBackIosIcon />
      </Fab>
    </Box>
    </>
}
export default HomeButton;