'use client';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorsThunk, setSelectedAuthors, setRandomQuotes } from '../store/slice/FontaneliSlice';
import AuthorsCard from '../components/AuthorsCard';
// import Quotes from '../components/Quotes';
import { Box, styled, Skeleton, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
// import OtherAuthorsCard from '../components/OtherAuthorsCard';

const OtherAuthorsCard = dynamic(() => import('../components/OtherAuthorsCard'), { ssr: false });
// const AuthorsCard = dynamic(() => import('../components/AuthorsCard'), { ssr: false });
const Quotes = dynamic(() => import('../components/Quotes'), { ssr: false });

const Title = styled(Box)({
  width: '100%',
  padding: '0.5rem',
  margin: '1rem 0',
  backgroundColor: '#e2dfdc',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1rem',
});

const QuoteBox = styled(Box)({
  border: '0.1rem solid #b7a491',
  padding: '1rem',
  width: '97%',
  margin: '2%',
  borderRadius: '0.5rem',
  boxShadow: '0 0.2rem 0.5rem rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1rem',
});

const Home = () => {
  const dispatch = useDispatch();
  const { authors = [], selectedAuthors = [], randomQuotes = [], loading, error } = useSelector((state) => state.authors);
  const intervalRef = useRef(null);

  const getRandomElements = (array, count) => {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  // console.log("Authors: ", authors);
  const setupAuthorsAndQuotes = () => {
    if (authors.length > 0) {
      const selected = getRandomElements(authors, 5);
      dispatch(setSelectedAuthors(selected));
  
      const randomQuotesFromAuthors = selected.flatMap((author) =>
        getRandomElements(author.quotes || [], 5).map((quote) => ({
          text: quote.quote,
          authorName: author.name,
        }))
      );
      dispatch(setRandomQuotes(randomQuotesFromAuthors));
    }
  };
  

  useEffect(() => {
    dispatch(fetchAuthorsThunk());
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the data immediately when the component loads
    if (authors.length > 0) {
      setupAuthorsAndQuotes(); // Get and display authors/quotes immediately
    }
  
    // Start the interval to update authors/quotes every 10 seconds
    intervalRef.current = setInterval(() => {
      setupAuthorsAndQuotes();
    }, 60 * 60 * 1000); // Every 10 seconds
  
    return () => clearInterval(intervalRef.current); // Clean up the interval
  }, [authors]);
  

  const renderSkeletons = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '16rem',
              padding: '1.5rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              textAlign: 'center',
              border: '0.1rem solid #e0e0e0',
              borderRadius: '0.5rem',
              boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.1)'
            }}
          >
            <Skeleton variant="circular" width={80} height={80} sx={{ margin: '0 auto 1rem' }} />
            <Skeleton variant="text" width="60%" height={30} sx={{ margin: '0 auto 1rem' }} />
            <Skeleton variant="text" width="50%" height={20} sx={{ margin: '0 auto 0.5rem' }} />
            <Skeleton variant="text" width="80%" height={85} sx={{ margin: '0 auto' }} />
            <Skeleton variant="text" width="80%" height={85} sx={{ margin: '0 auto' }} />
            <Skeleton variant="text" width="80%" height={90} sx={{ margin: '0 auto' }} />
          </Box>
        ))}
    </Box>
  );

  if (error) {
    return (
      <Box sx={{ padding: '1rem' }}>
        <Box sx={{ fontWeight: '600', fontSize: '5rem', padding: '1rem', color: 'orange' }}>Oops...!</Box>
        <Box sx={{ padding: '0 4rem', color: 'red', fontWeight: '500', fontSize: '2rem' }}>{error}</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingBottom: '2rem' }}>
      <Title>Suggested authors for you:</Title>
      {loading || selectedAuthors.length === 0 ? (
        renderSkeletons()
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {selectedAuthors.map((item, index) => (
            <AuthorsCard
              key={index}
              img={item.image}
              name={item.name}
              bDate={item.birth}
              dDate={item.death}
              des={item.description}
            />
          ))}
        </Box>
      )}

      <Box sx={{ width: '90%', height: '2px', margin: '2rem auto', backgroundColor: '#4B5534' }}></Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          margin: '0 1rem',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '70%' },
            marginBottom: { xs: '1rem', md: '0' },
          }}
        >
          <QuoteBox>Our 30 Quotes of the Day</QuoteBox>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {randomQuotes.length > 0 ? (
              randomQuotes.map((quote, index) => (
                <Quotes key={index} Quotes={quote.text} Name={quote.authorName} />
              ))
            ) : (
              <Box sx={{ fontStyle: 'italic', color: 'gray' }}>No quotes available at the moment. Please check back later.</Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '30%' },
            height: { xs: 'auto', lg: '50%' },
            border: '1px solid #e0e0e0',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: { xs: '1rem', md: '1rem' },
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            Few of our Authors:
          </Typography>

          {authors.slice(5, 10).length > 0 ? (
            authors.slice(5, 10).map((author, index) => (
              <OtherAuthorsCard
                key={index}
                img={author.image}
                name={author.name}
                description={author.description}
              />
            ))
          ) : (
            <Box sx={{ fontStyle: 'italic', color: 'gray' }}>No authors to display.</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;