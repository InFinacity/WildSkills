import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Typography } from '@mui/material';

const Category = ({ onCategoriesChange }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/wildSkills/category/getAllCategory');
            setCategories(response.data);
            if (onCategoriesChange) {
                onCategoriesChange(response.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id, name) => {
        setEditingCategoryId(id);
        setNewCategoryName(name);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/wildSkills/category/deleteCourseDetails/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();

        if (editingCategoryId) {
            try {
                await axios.put(`http://localhost:8080/api/wildSkills/category/putCategoryDetails?id=${editingCategoryId}`, {
                    name: newCategoryName,
                });
                setEditingCategoryId(null);
            } catch (error) {
                console.error('Error updating category:', error);
            }
        } else {
            try {
                await axios.post('http://localhost:8080/api/wildSkills/category/postCategoryRecord', {
                    name: newCategoryName,
                });
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }

        setNewCategoryName('');
        fetchCategories();
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setNewCategoryName('');
    };

    return (
        <Box sx={{ height: '73vh', width: '95vw', margin: '20px auto', textAlign: 'center', alignContent: 'center', justifyContent: 'center', padding:'50px',backgroundColor:'#ffffff' }}>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Category ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.categoryId}>
                                    <TableCell>{category.categoryId}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleEdit(category.categoryId, category.name)}
                                            sx={{ marginRight: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleDelete(category.categoryId)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box
                component="form"
                onSubmit={handleAddOrUpdate}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3 }}
            >
                <TextField
                    label="Category Name"
                    value={newCategoryName}
                    style={{color: '#ffffff'}}
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
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    required
                />
                <Box>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        {editingCategoryId ? 'Update' : 'Add'}
                    </Button>
                    {editingCategoryId && (
                        <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Category;