'use client';
import { Box, Button, Skeleton, styled } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import AuthorsCard from '../components/AuthorsCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorsThunk, setSelectedAuthors } from '../store/slice/FontaneliSlice';

const Title = styled(Box)({
    width: '100%',
    padding: '0.5rem',
    margin: '1rem 0',
    backgroundColor: '#e2dfdc',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1rem',
    display: 'flex',
    flexDirection: 'row', // Default to row
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': { // Adjust the max-width according to your design
        flexDirection: 'column', // Change to column on small screens
    },
});

// Wrapper for responsiveness
const ResponsiveWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    '@media (min-width: 768px)': {
        flexDirection: 'row',
    }
});

// RefreshButton
const RefreshButton = styled(Button)({
    color: 'black',
    backgroundColor: 'white',
    border: '0.1rem solid black',
    borderRadius: '5rem', // Rounded corners
    textTransform: 'none',
    fontWeight: '600'
})

const DiscoverAuthors = () => {

    const dispatch = useDispatch();
    const { authors = [], selectedAuthors = [], loading, error } = useSelector((state) => state.authors);
    const intervalRef = useRef(null);

    const getRandomElements = (array, count) => {
        return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
    };

    const setupAuthors = () => {
        if (authors.length > 0) {
            const selected = getRandomElements(authors, 8);
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


    const renderSkeletons = () => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
            {Array(4).fill("").map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '16rem',
                        padding: '1.5rem',
                        textAlign: 'center',
                        border: '0.1rem solid #e0e0e0',
                        borderRadius: '0.5rem',
                        boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Skeleton variant="circular" width={80} height={80} sx={{ margin: '0 auto 1rem' }} />
                    <Skeleton variant="text" width="60%" height={30} sx={{ margin: '0 auto 1rem' }} />
                    <Skeleton variant="text" width="50%" height={20} sx={{ margin: '0 auto 0.5rem' }} />
                    <Skeleton variant="text" width="80%" height={90} sx={{ margin: '0 auto' }} />
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
        <Box>
            <Title>
                <Box></Box>
                <Box>
                    Discover new authors and click if you want to read their quotes.
                </Box>
                <RefreshButton variant="outlined"
                    href='/discover'>
                    Generate new authors
                </RefreshButton>
            </Title>

            {/* Responsive Wrapper */}
            <ResponsiveWrapper>
                {loading ? (
                    renderSkeletons()
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
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
            </ResponsiveWrapper>
        </Box>
    );
};

export default DiscoverAuthors;