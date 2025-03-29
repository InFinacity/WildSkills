import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Divider, Rating } from '@mui/material';
import axios from 'axios';

const UpdateReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({ title: '', comment: '', rating: 0 });

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/review/getReviewById/${id}`);
                setReview(response.data);
            } catch (error) {
                console.error("Error fetching review:", error);
                alert('Failed to load review.');
            }
        };
        fetchReview();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/review/putReviewDetails/${id}`, review);
            alert('Review updated successfully');
            navigate(-1);
        } catch (error) {
            console.error("Error updating review:", error);
            alert('Failed to update review.');
        }
    };

    return (
        <div>
            <Typography variant="h4">Update Review</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Rating
                value={review.rating}
                style={{fontSize: "50px"}}
                precision={0.5}
                onChange={(e, newValue) => setReview({ ...review, rating: newValue })}
            />
            <TextField
                label="Comment"
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>
                Save Changes
            </Button>
        </div>
    );
};

export default UpdateReview;
