'use client'; // If using Next.js with the app directory

import { Box, Typography, styled, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { setChosenAuthor } from '../store/slice/FontaneliSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image'; // Import Next.js Image

// Styling for the card
const Card = styled(Button)({
  width: '16rem', // Card takes 20% width
  height: '30rem',
  padding: '1.5rem', // Padding in rem for spacing
  border: '0.1rem solid #e0e0e0', // Border in rem
  borderRadius: '0.5rem', // Border-radius in rem
  textAlign: 'center',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.1)', // Shadow in rem
  fontFamily: "Roboto, sans-serif",
  color: 'black',
  textTransform: 'capitalize',
  margin: '1rem auto', // Center the card horizontally

  display: 'flex',        // Enable flexbox
  flexDirection: 'column', // Stack items vertically
  alignItems: 'center',    // Center items horizontally
  justifyContent: 'space-between' // Optional: distribute space between items
});

// Styling for the image container
const ImageWrapper = styled('div')({
  width: '9rem', // Image width in rem
  height: '9rem', // Image height in rem
  margin: '0 auto 1rem', // Center image and add bottom margin
  borderRadius: '50%', // Circular shape
  overflow: 'hidden', // Ensure the image doesn't overflow
  border: '0.25rem solid white', // Border in rem
  boxShadow: '0 0.6rem 1rem rgba(0, 0, 0, 0.2)', // Shadow for image
  position: 'relative', // Required for Next.js Image
});

// The AuthorsCard component accepting props
const AuthorsCard = ({ img, name, bDate, dDate, des }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Function to handle author selection and navigation
  const handleAuthorSelect = (newValue) => {
    if (newValue) {
      dispatch(setChosenAuthor(newValue));
      router.push("/author");
    }
  };

  return (
    <Card onClick={() => handleAuthorSelect(name)}>
      {/* Profile image using Next.js Image */}
      <ImageWrapper>
        <Image
          src={img}
          alt={name}
          fill // Ensures the image fills the parent container
          sizes="(max-width: 768px) 50vw, 20vw" // Responsive image sizing
          style={{
            objectFit: 'cover', // Maintains aspect ratio while filling the container
          }}
          priority // Optimizes loading for important images
        />
      </ImageWrapper>

      {/* Author Name */}
      <Typography variant="h6" fontWeight="bold">
        {name}
      </Typography>

      {/* Author lifespan */}
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {bDate} - {dDate}
      </Typography>

      {/* Description */}
      <Typography variant="body2" color="textSecondary">
        {des}
      </Typography>
    </Card>
  );
};

export default AuthorsCard;