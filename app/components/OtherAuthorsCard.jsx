'use client';
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setChosenAuthor } from '../store/slice/FontaneliSlice';
import Image from 'next/image';

const OtherAuthorsCard = ({ img, name, description }) => {
    // Function to truncate description to 4-5 words and add "..."
    const truncateDescription = (desc, wordLimit) => {
        const words = desc.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return desc;
    };

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
        <Card
            sx={{
                display: 'flex',
                marginBottom: '0.5rem',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
            }}
        >
            <Button
                sx={{ color: 'black' }}
                onClick={() => handleAuthorSelect(name)}
            >
                {/* Image Container */}
                <Box
                    sx={{
                        marginRight: '0.5rem',
                        width: '40%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Modern Next.js Image */}
                    <Box
                        sx={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            overflow: 'hidden', // Ensures the circular shape
                            position: 'relative', // Required for Next.js Image
                        }}
                    >
                        <Image
                            src={img}
                            alt={name}
                            fill // Replaces `layout="fill"`
                            sizes="(max-width: 600px) 80px, 100px" // Specify sizes for responsiveness
                            style={{
                                objectFit: 'cover', // Replaces `objectFit`
                                borderRadius: '50%', // Ensures the circular shape
                            }}
                            // priority // Optimizes loading for important images
                        />
                    </Box>
                </Box>

                <CardContent>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {truncateDescription(description, 5)} {/* Restricting description to 5 words */}
                    </Typography>
                </CardContent>
            </Button>
        </Card>
    );
};

export default OtherAuthorsCard;