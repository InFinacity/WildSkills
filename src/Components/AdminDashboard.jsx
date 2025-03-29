import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [recentSkillOfferings, setRecentSkillOfferings] = useState([]);
    const [recentSkillExchanges, setRecentSkillExchanges] = useState([]);

    const navigate = useNavigate();

    const [offeringCount, setOfferingCount] = useState(0);
    const [exchangeCount, setExchangeCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);

    useEffect(() => {
        const searchRecent = async () => {
            try {
                const response = await axios.get('https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/skilloffering/searchRecent');
                console.log("skill offerings:" + response.data);
                setRecentSkillOfferings(response.data);
                console.log(recentSkillOfferings)
            } catch (error) {
                console.error('Error fetching recent skill offering:', error);
                alert('Error fetching recent skill offerings.');
            }
        };

        const searchRecentExchanges = async () => {
            try {
                const response = await axios.get('https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/skillExchange/getRecentExchanges');
                console.log("skill exchanges:" + response.data);
                setRecentSkillExchanges(response.data);
            } catch (error) {
                console.error('Error fetching recent skill exchanges:', error);
                alert('Error fetching recent skill exchanges.');
            }
        };

        const countAllOffering = async () => {
            try {
                const response = await axios.get('https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/skilloffering/countAllOfferings');
                console.log("offering count: " + response.data);
                setOfferingCount(response.data);
            } catch (error) {
                console.error('Error fetching skill offering count:', error);
                alert('Error fetching skill offering count.');
            }
        };

        const countAllExchange = async () => {
            try {
                const response = await axios.get('https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/skillExchange/countAllExchange');
                console.log("exchange count: " + response.data);
                setExchangeCount(response.data);
            } catch (error) {
                console.error('Error fetching skill exchange count:', error);
                alert('Error fetching skill exchange count.');
            }
        };

        const countAllStudent = async () => {
            try {
                const response = await axios.get('https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/student/countTotalUsers');
                console.log("student count: " + response.data);
                setStudentCount(response.data);
            } catch (error) {
                console.error('Error fetching user count:', error);
                alert('Error fetching user count.');
            }
        };

        const countAllCategories = async () => {
            try {
                const response = await axios.get('https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/category/countTotalCategories');
                console.log("categories count: " + response.data);
                setCategoryCount(response.data);
            } catch (error) {
                console.error('Error fetching categories count:', error);
                alert('Error fetching categories count.');
            }
        };

        

        searchRecent();
        searchRecentExchanges();
        countAllOffering();
        countAllExchange();
        countAllStudent();
        countAllCategories();
    }, []);

    const handleNavigate = () => {
        navigate('/categories');
    };

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 2,
            minHeight: '100vh',
            backgroundColor: '#e5f0fc',
            width: '100vw',
        }}
        >
        <Box
            sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            }}
        >
            <Card
            sx={{
                width: 250,
                height: 120,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f7b267',
                color: 'white',
                boxShadow: 3,
                textAlign: 'center',
            }}
            >
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Total Exchanges
                </Typography>
                <Typography variant="h4" component="div" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                {exchangeCount}
                </Typography>
            </CardContent>
            </Card>

            <Card
            sx={{
                width: 250,
                height: 120,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#84c7ae',
                color: 'white',
                boxShadow: 3,
                textAlign: 'center',
            }}
            >
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Total Offerings
                </Typography>
                <Typography variant="h4" component="div" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                {offeringCount}
                </Typography>
            </CardContent>
            </Card>

            <Card
            sx={{
                width: 250,
                height: 120,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#d4a5d9',
                color: 'white',
                boxShadow: 3,
                textAlign: 'center',
            }}
            >
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Total Skill Categories
                </Typography>
                <Typography variant="h4" component="div" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                {categoryCount}
                </Typography>
            </CardContent>
            </Card>

            <Card
            sx={{
                width: 250,
                height: 120,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6290c3',
                color: 'white',
                boxShadow: 3,
                textAlign: 'center',
            }}
            >
            <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Total Users
                </Typography>
                <Typography variant="h4" component="div" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                {studentCount}
                </Typography>
            </CardContent>
            </Card>
        </Box>

        <Button onClick={handleNavigate}>Add Categories</Button>

        <Box
            sx={{
            width: '90%',
            maxWidth: 1000,
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 3,
            boxShadow: 3,
            }}
        >
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Recent Skill Offerings
            </Typography>
            <List>
                {recentSkillOfferings.map((recent) => (
                    <ListItem key={recent.skillOfferingId} divider>
                        <ListItemText primary= {recent.title} />
                    </ListItem>
                ))}
            </List>
        </Box>


        <Box
            sx={{
            width: '90%',
            maxWidth: 1000,
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 3,
            boxShadow: 3,
            }}
        >
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Recent Skill Exchanges
            </Typography>

            {recentSkillExchanges.map((recentSO) => (
                <ListItem key={recentSO.skill_exchangeid} divider>
                <ListItemText primary={recentSO.title}/>
                </ListItem>
            ))}

        </Box>
        </Box>
    );
};

export default Dashboard;
