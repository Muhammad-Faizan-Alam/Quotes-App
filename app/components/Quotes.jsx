import { Box, styled } from '@mui/material'
import React, { useRef } from 'react'

import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const QuoteBox = styled(Box)({
  border: '0.1rem solid #b7a491',
  padding: '1rem',
  width: '90%',
  maxHeight: '12rem',
  // margin: '0% auto',
  borderRadius: '0.5rem', // Rounded corners
  boxShadow: '0 0.2rem 0.5rem rgba(0, 0, 0, 0.1)', // Slight shadow for depth
})

const Quotes = ({ Quotes, Name }) => {

  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.toggle('liked');
    }
  };

  return (
    <>
      <QuoteBox>
        <Box>{Quotes}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
          <IconButton
            ref={buttonRef}
            onClick={handleClick}
            sx={{
              color: 'inherit',
              '&:hover': {
                color: 'red',
              },
              '&.liked': {
                color: 'red', // Stay red after clicking
              },
            }}
          >
            <FavoriteBorderIcon sx={{ display: 'none', '&.liked': { display: 'block' } }} />
            <FavoriteIcon sx={{ display: 'block', '&.liked': { display: 'none' } }} />
          </IconButton>
          <Box>{Name}</Box>
        </Box>
      </QuoteBox>
    </>
  )
}

export default Quotes