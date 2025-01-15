'use client';
import { useEffect, useRef } from 'react';
import AuthorsCard from '../components/AuthorsCard';
import Quotes from '../components/Quotes';
import { Box, Button, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorsThunk, setSelectedAuthors, setSelectedTopic } from '../store/slice/FontaneliSlice';
import OtherAuthorsCard from '../components/OtherAuthorsCard';
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

const TopicCard = styled(Box)({
  border: '0.1rem solid #b7a491',
  marginTop: '1rem',
  width: '20%',
  height: '4rem',
  borderRadius: '0.5rem',
  boxShadow: '0 0.2rem 0.5rem rgba(0, 0, 0, 0.1)',
  fontSize: '1.4rem',
  fontWeight: '700',
  alignContent: 'center',
  textAlign: 'center'
});

const Topic = () => {
  const dispatch = useDispatch();
  const { authors = [], selectedAuthors = [], loading, error, selectedTopic } = useSelector(state => state.authors);
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


  // Select topic and set in Redux store
  const handleSelectedTopic = (value) => {
    dispatch(setSelectedTopic(value));
  };

  // Define topics array
  const topicArray = ['Leadership', 'Motivation', 'Inspiration', 'Innovation', 'Success', 'Science'];

  // Find and display quotes by selected topic
  const matchedQuotes = authors
    .flatMap(author => author.quotes.map(quote => ({ ...quote, name: author.name })))
    .filter(quote => quote.topic === selectedTopic);


  if (error) {
    return (
      <Box sx={{ padding: '1rem' }}>
        <Box sx={{ fontWeight: '600', fontSize: '5rem', padding: '1rem', color: 'orange' }}>Oops...!</Box>
        <Box sx={{ padding: '0 4rem', color: 'red', fontWeight: '500', fontSize: '2rem' }}>{error}</Box>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: '100%', backgroundColor: '#4a5547', color: 'white', alignContent: 'center', textAlign: 'center', fontWeight: '700' }}>
        Topics:
        {topicArray.map((topic) => (
          <Button key={topic} sx={{ color: 'white', fontWeight: '700' }} onClick={() => handleSelectedTopic(topic)}>
            {topic}
          </Button>
        ))}
      </Box>

      <ResponsiveWrapper>
        <TopicCard>{selectedTopic || "Select a Topic"}</TopicCard>

        {/* Quotes Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem', width: { lg: '50%', xs: '100%' } }}>
          {matchedQuotes.length > 0 ? (
            matchedQuotes.slice(0, 5).map((quote, index) => (
              <Quotes key={index} Quotes={quote.quote} Name={quote.name} />
            ))
          ) : (
            <Box>No quotes available for this topic.</Box>
          )}
        </Box>

        {/* Few of our Authors */}
        <Box sx={{ width: { xs: '100%', lg: '30%' }, height: { xs: 'auto', lg: '50%' }, border: '1px solid #e0e0e0', padding: '0.5rem', borderRadius: '8px', marginTop: { xs: '1rem', md: '1rem' } }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            Few of our Authors:
          </Typography>

          {authors.slice(6, 10).map((author, index) => (
            <OtherAuthorsCard
              key={index}
              img={author.image} name={author.name} description={author.description} />
          ))}
        </Box>
      </ResponsiveWrapper>

      <Box sx={{ width: '90%', height: '2px', margin: '2rem auto', backgroundColor: '#4B5534', '@media (max-width: 1024px)': { display: 'none' } }} />

      <Title sx={{ '@media (max-width: 1024px)': { display: 'none' } }}>
        Thanks to visit, checkout our other authors as well:
      </Title>

      {error ? (
        renderSkeletons()
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', '@media (max-width: 1024px)': { display: 'none' } }}>
          {selectedAuthors.map((item, index) => (
            <AuthorsCard
              key={index}
              img={item.image} name={item.name} bDate={item.birth} dDate={item.death} des={item.description} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Topic;