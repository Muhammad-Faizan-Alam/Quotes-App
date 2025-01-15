'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Skeleton, styled, Typography, Tabs, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorsThunk, setChosenAuthor, setSelectedAuthors } from '../store/slice/FontaneliSlice';
import AuthorsCard from '../components/AuthorsCard';
import OtherAuthorsCard from '../components/OtherAuthorsCard';
import Quotes from '../components/Quotes';
import React from 'react';

const Title = styled(Box)({
  width: '100%',
  padding: '0.5rem',
  margin: '1rem 0',
  backgroundColor: '#e2dfdc',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1rem'
});

// Wrapper for responsiveness
const ResponsiveWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  '@media (min-width: 768px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '2rem',
  },
});

const Author = () => {
  const dispatch = useDispatch();
  const { authors = [], selectedAuthors = [], chosenAuthor, loading } = useSelector((state) => state.authors);
  const intervalRef = useRef(null);

  const getRandomElements = (array, count) => {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const setupAuthors = () => {
    if (authors.length > 0) {
      const selected = getRandomElements(authors, 4);
      dispatch(setSelectedAuthors(selected));
    }
  };
  

  useEffect(() => {
    dispatch(fetchAuthorsThunk());
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the data immediately when the component loads
    if (authors.length > 0) {
      setupAuthors(); // Get and display authors/quotes immediately
    }
  
    // Start the interval to update authors/quotes every 10 seconds
    intervalRef.current = setInterval(() => {
      setupAuthors();
    }, 60 * 60 * 1000); // Every 10 seconds
  
    return () => clearInterval(intervalRef.current); // Clean up the interval
  }, [authors]);

  const [tabValue, setTabValue] = useState(0);

  // Find chosenAuthor
  const handleMatch = () => {
    const matchedObject = authors.find(item => item.name === chosenAuthor);
    return matchedObject || null;
  };
  const matchedObject = handleMatch();

  // Split quotes into three parts
  const quotesPerTab = Math.ceil(matchedObject?.quotes?.length / 3) || 1;
  const quoteSections = [
    matchedObject?.quotes.slice(0, quotesPerTab),
    matchedObject?.quotes.slice(quotesPerTab, 2 * quotesPerTab),
    matchedObject?.quotes.slice(2 * quotesPerTab)
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <ResponsiveWrapper>
        {loading ? (
          <Skeleton variant="loading" width="30%" height={400} marginleft="3rem"
          />
        ) : (
          <Box sx={{ width: { lg: '30%', xs: '100%' } }}>
            {matchedObject ? (
              <AuthorsCard
                img={matchedObject.image}
                name={matchedObject.name}
                bDate={matchedObject.birth}
                dDate={matchedObject.death}
                des={matchedObject.description}
              />
            ) : (
              <Box>No author's data!</Box>
            )}
          </Box>
        )}

        {/* Quotes section with tabs */}
        <Box sx={{ width: { lg: '40%', xs: '100%' }, marginTop: '1rem' }}>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', paddingTop: '1rem' }}>
            {quoteSections[tabValue] && quoteSections[tabValue].length > 0 ? (
              quoteSections[tabValue].map((quote, index) => (
                <Quotes key={index} Quotes={quote.quote} Name={matchedObject.name} />
              ))
            ) : (
              <Box>No quotes available in this section.</Box>
            )}
          </Box>

          {/* tab number */}
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="1" />
            <Tab label="2" />
            <Tab label="3" />
          </Tabs>
        </Box>

        {/* Few of our Authors */}
        <Box sx={{
          width: { xs: '100%', lg: '30%' },
          height: { xs: 'auto', lg: '50%' },
          border: '1px solid #e0e0e0',
          padding: '0.5rem',
          borderRadius: '8px',
          marginTop: { xs: '1rem', md: '1rem' },
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            Few of our Authors:
          </Typography>
          {authors.slice(6, 10).map((author, index) => (
            <OtherAuthorsCard
              key={index}
                img={author.image}
                name={author.name}
                description={author.description}
              />
          ))}
        </Box>
      </ResponsiveWrapper>

      {/* Green Line */}
      <Box sx={{
        width: '90%',
        height: '2px',
        margin: '2rem auto',
        backgroundColor: '#4B5534',
        '@media (max-width: 1024px)': { display: 'none' },
      }} />

      {/* Suggested Authors - Hidden on mobile and tablet */}
      <Title sx={{ '@media (max-width: 1024px)': { display: 'none' } }}>
        Thanks for visiting, check out our other authors as well:
      </Title>

      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          '@media (max-width: 1024px)': { display: 'none' }
        }}>
          {selectedAuthors.map((item, index) => (
            <Button key={index} onClick={() => dispatch(setChosenAuthor(item.name))}>
              <AuthorsCard
                img={item.image}
                name={item.name}
                bDate={item.birth}
                dDate={item.death}
                des={item.description}
              />
            </Button>
          ))}
        </Box>
      )}
    </>
  );
};

export default Author;