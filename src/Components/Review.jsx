import React, { useState } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[3],
}));

const Review = () => {
    const location = useLocation();
    const { userId, exchangeId } = location.state || {};

    const [rating, setRating] = useState(2.5);
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
        if (!exchangeId) {
            alert('Exchanged student not found.');
            return;
        }

        try {
            const response = await axios.post(`https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/review/reviewStudent/${userId}/${exchangeId}`, {
                rating: rating,
                comment: comment,
            });
            alert('Review submitted successfully!');
            setRating(2.5);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review.');
        }
    };

    const CustomRating = styled(Rating)({
        '& .MuiRating-icon': {
            fontSize: '50px',
            marginBottom: '20px'
        },
    });

    return (
        <div
            style={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#121212',
                width: '100vw'
            }}
        >
            <Box
                sx={{
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '40px',
                    maxWidth: '500px',
                    width: '90%',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    Rate Your Experience
                </Typography>
                <Divider sx={{ margin: '20px 0' }} />
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                        <Item>
                            <Box sx={{ textAlign: 'center' }}>
                            <CustomRating
                                name="half-rating"
                                value={rating}
                                precision={0.5}
                                onChange={(event, newValue) => setRating(newValue)}
                            />;
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Write your comment"
                                    multiline
                                    rows={4}
                                    placeholder="Share your experience..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    fullWidth
                                    sx={{
                                        marginBottom: '20px',
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{
                                        marginTop: '15px',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        backgroundColor: '#b03d3d'
                                    }}
                                >
                                    Submit Review
                                </Button>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Review;