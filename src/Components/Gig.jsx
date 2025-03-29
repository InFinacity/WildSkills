import React, { useEffect, useState } from 'react';
import { Card, CardContent,Box, Typography, Avatar,Chip,Paper, IconButton, TextField,Divider, Button, Switch, FormControlLabel } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import { Close } from '@mui/icons-material';
import Person from '@mui/icons-material/Person';
import axios from 'axios';

const Gig = ({userId}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});;
    const { title, description, skills = [], isActive, category, skillOfferingId } = location.state || {};
    const categoryId = category?.categoryId || null;
    const [resolvedCategoryName, setCategoryName] = useState(category ? category.name : 'Unknown Category');
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editSkills, setEditSkills] = useState(skills);
    const [isEditing, setIsEditing] = useState(false);
    const [editIsActive, setEditIsActive] = useState(isActive); 
    const [authId, setAuthId] = useState();

    const api = axios.create({
        baseURL: 'https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/student',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    useEffect(() => {
        console.log('Student data:', student);  // Log entire student object to see its structure
    }, [student]);
    
    useEffect(() => {
        const fetchStudent = async () => {
            if (!userId) {
                console.error('User ID is missing!');
                return;
            }
            try {
                const response = await api.get(`/getUserStudentRecord?id=${userId}`);
                const fetchedStudent = response.data;
                setStudent(fetchedStudent);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
    
        fetchStudent();
    }, [userId]);    



    useEffect(() => {
        const fetchCategoryName = async () => {
            if (categoryId && !category) {
                try {
                    const response = await axios.get(`https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/category/getCategory/${categoryId}`);
                    setCategoryName(response.data.name);
                } catch (error) {
                    console.error('Error fetching category name:', error);
                }
            }
        };
        fetchCategoryName();
    }, [categoryId, category]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCloseClick = () => {
        navigate('/skill-offerings');
    };

    const handleSaveClick = async () => {
        const skillOfferingData = {
            title: editTitle,
            description: editDescription,
            skills: editSkills,
            isActive: editIsActive,
        };
        try {
            await axios.put(`https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/skilloffering/student/${userId}/putSkillOfferingDetails/client/${skillOfferingId}`, skillOfferingData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving skill offering details', error);
        }
    };

    const skillArray = editSkills ? editSkills.split(',') : [];

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="83vh"
            minWidth="99vw"
            sx={{
                background: 'linear-gradient(120deg, #000000, #434343)', 
                padding: 2, 
                margin: '0 auto',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: 3,
                    borderRadius: 3,
                    maxWidth: '700px',
                    width: '100%',
                }}
            >
                <Box display="flex" alignItems="center" mb={3}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {editTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {student.name}
                        </Typography>
                    </Box>
                    <IconButton color="primary" onClick={handleEditClick} sx={{ marginLeft: 'auto' }}>
                        <Edit />
                    </IconButton>
                    
                    <IconButton color="primary" onClick={handleCloseClick}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                {!isEditing ? (
                    <>
                        {/* 
                        {student.authKey && student.authKey.authStatus === true ? (
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                            Online
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                            Offline
                            </Typography>
                        )}
                        */}
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {resolvedCategoryName}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2, lineHeight: 1.8 }}>
                            {editDescription}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1} mt={3}>
                            {skillArray.slice(0, 10).map((skill, index) => (
                                <Chip 
                                    key={index} 
                                    label={skill.trim()} 
                                    sx={{ bgcolor: '#e0f7fa', color: '#006064', fontWeight: 'bold' }} 
                                />
                            ))}
                        </Box>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                        />
                        <TextField
                            label="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                        />
                        <TextField
                            label="Skills"
                            value={editSkills}
                            onChange={(e) => setEditSkills(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveClick}
                            sx={{
                                marginTop: 2,
                                background: 'linear-gradient(45deg, #cf2d2d 30%, #ff762e 90%)', 
                                border: 0,
                                borderRadius: 3,
                                height:'40px',
                                maxWidth:'100px',
                                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', 
                                color: 'white',
                                padding: '0 30px',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #cf2d2d 30%, #ff762e 90%)',
                                },
                            }}
                        >
                            <Save style={{ marginRight: '8px' }} />
                            Save
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
    
}
    

export default Gig;
