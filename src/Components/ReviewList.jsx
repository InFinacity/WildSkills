import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, Box, IconButton, Rating, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ReviewList = ({ userId }) => {
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const studentId = location.state?.id || 1;

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/review/getStudentReviews/${studentId}`);
            console.log("API response:", response.data);
            setReviews(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredReviews = reviews.filter((review) =>
        review.revieweeName?.toLowerCase().includes(search.toLowerCase()) ||
        review.comment?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ padding: 3, width: '100vw' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{color: '#ffffff'}}>
                {reviews && reviews.length > 0 ? reviews[0].revieweeName+"'s Reviews" : "No reviews available for this user yet"}
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search reviews..."
                    size="small"
                    fullWidth
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <Search sx={{ color: 'white'}}/>
                            </IconButton>
                        ),
                    style: { color: 'white' }
                    }}
                    sx={{ marginRight: 2,
                        '& .MuiOutlinedInput-root': { 
                            '& fieldset': { 
                                borderColor: '#bdbdbd', 
                            }, '&:hover fieldset': { 
                                borderColor: '#bdbdbd',
                            }, '&.Mui-focused fieldset': { 
                                borderColor: '#bdbdbd', 
                            }, 
                        } 
                    }}
                />
            </Box>
            <Grid container spacing={3}>
                {filteredReviews.map((review) => (
                    <Grid item xs={12} sm={6} md={4} key={review.reviewId}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                boxShadow: 3,
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" sx={{ marginY: 1 }}>
                                    <Rating precision={0.5} value={review.rating} readOnly />
                                    <Typography variant="body2" sx={{ marginLeft: 1, fontSize: 20 }}>
                                        {review.rating.toFixed(1)}
                                    </Typography>
                                </Box>
                                {/*<Typography variant="h6" fontWeight="bold">
                                    {review.revieweeName || 'Unnamed Review'}
                                </Typography>*/}
                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="subtitle2" color="textSecondary">
                                    Reviewed by: {review.reviewerName}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    {review.comment || 'No comment provided.'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ReviewList;
