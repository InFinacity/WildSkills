import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SkillExchange from './Components/SkillExchange';
import Category from './Components/Category';
import SkillOffering from './Components/SkillOffering';
import Chat from './Components/Chat';
import './App.css'; 
import Registration from './Components/Registration';
import UserIcon from './assets/images/UserIcon.png';
import Gig from './Components/Gig';
import GigHome from './Components/GigHome';
import Review from './Components/Review';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Login from './Components/Login';
import ReviewList from './Components/ReviewList';
import UpdateReview from './Components/ReviewUpdate';
import BrowseCategory from './Components/BrowseCategory';
import SearchOffering from './Components/SearchOffering';
import { Button, Grid2, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import wiski_logo from './assets/images/HomeAssets/wiski-logo.png';
import { Buffer } from 'buffer';
import process from 'process';
import SearchIcon from '@mui/icons-material/Search'; // Import the Search Icon
import {  InputAdornment } from '@mui/material/';
import Dashboard from './Components/AdminDashboard';

window.global = window;
window.Buffer = Buffer;
window.process = process;

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || 'blank');
    const [authId, setAuthId] = useState(() => localStorage.getItem('authId') || 'blank');
    const [authDetails, setAuthDetails] = useState({});
    const [query, setQuery] = useState(''); 
    const [tempQuery, setTempQuery] = useState('');

    const handleKeyDown = (e) => { if (e.key === 'Enter') { 
        setQuery(tempQuery);
        console.log('Search triggered with query:', tempQuery);
    } 
    }; 
    
    const handleSearchIconClick = () => { 
        setQuery(tempQuery);
        console.log('Search triggered with query:', tempQuery); 
    };
    

    const defaultVal = 'blank';


    
    useEffect(() => {
        localStorage.setItem('authId', authId);
        localStorage.setItem('userId', userId);

        console.log('Auth Id: ', authId);
        console.log('User Id: ', authId);
    }, [authId, userId]);

    const updateAuthentication = (choice) =>{
        console.log('choice: ',choice);
        if(choice==true){
            setAuthenticated(true);
            setTimeout(100);
        }
        else{
            localStorage.removeItem('authId');
            localStorage.removeItem('userId');
        //localStorage.removeItem('sessionEnd');
        
            setAuthId(defaultVal);
            setUserId(defaultVal);
            //setSessionEnd(null);
            apiAuth.put(`/putUpdateAuthenticationStatus?authId=${authId}`,false);
            setAuthenticated(false);
    
        console.log('Logout successfulz');
        }

    }

    
    useEffect(() => {
        const checkAuth = async (authId) => {
            if (authId !== 'blank') {
                try {
                    const authResponse = await apiAuth.get(`/getAuthenticationDetails?authId=${authId}`);
                    const currStatus = authResponse.data.authStatus;
                    const sessionEndTime = new Date(authResponse.data.sessionDurationEnd);
                    const currTime = new Date();

                    localStorage.setItem('sessionEnd', sessionEndTime.toISOString());
                    //setSessionEnd(sessionEndTime);

                    if (currStatus === true && sessionEndTime > currTime) {
                        console.log('test');
                        updateAuthentication(true);
                    } else {
                        updateAuthentication(false);
                        setTimeout(() => {
                            logoutHandle();
                        }, 100);
                    }
                } catch (error) {
                    console.error('Error checking authentication status', error);
                    updateAuthentication(false);
                }
            }
        };

        checkAuth(authId);

        const interval = setInterval(()=>{
            checkAuth(authId);

            
        },60000);

        return () => clearInterval(interval);
    }, [authId]);
    

    const apiAuth = axios.create({
        baseURL: 'https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/authentication',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });


    const handleCategory = (category) => {
        console.log('Clicked category:', category);
        navigate('/browsecategories', { state: { category } });;
    };

    /*
    const logoutHandle = async () => {
        localStorage.removeItem('authId');
        localStorage.removeItem('userId');
        //localStorage.removeItem('sessionEnd');
        
        setAuthId(defaultVal);
        setUserId(defaultVal);
        //setSessionEnd(null);
        setAuthenticated(false);
    
        console.log('Logout successful');
    };
    */

    return (
        <>
            <Router>
                <div>
                    <Grid2><Stack direction={'row'}>
                                 
                        <div className="apptxt" style={{ borderBottom: "solid 2px", paddingBottom: 20, backgroundColor: "#b03d3d" }}>
                            <Link to="/" className="apptxt" style={{ marginLeft: '15%', marginTop: 10 }}>
                                <img src={wiski_logo} alt="Wiski Logo" style={{ width: 'auto', height: '50px' }} />
                            </Link>
                        </div>

                        <div className="routetxt">
                            <nav>
                                {authenticated && (
                                    <>
                                    { <TextField 
                                        id="outlined-basic" 
                                        variant="outlined" 
                                        size="small" 
                                        placeholder="What service are you looking for today?" 
                                        style={{ width: '400px', marginBottom: '10px', border: '1px solid white', borderRadius: '6px', backgroundColor: 'white', opacity:0 }}
                                        value={tempQuery} 
                                        onChange={(e) => setTempQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon style={{ cursor: 'pointer' }} onClick={handleSearchIconClick} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    }
                                        {/*<Link to="/categories" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>Categories</Link>*/}
                                        {userId === 1 && (
                                            <Link to="/adminDashboard" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link to="/browsecategories" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>Browse Categories</Link>
                                        <Link to="/skill-offerings" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>Skill Offerings</Link>
                                        <Link to="/skill-exchange" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>Skill Exchange</Link>
                                        <Link to="/profile" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>Profile</Link>

                                        <Link to="/login" style={{ margin: '10px', textDecoration: 'none', color: 'white' }} onClick={() => updateAuthentication(false)}>Logout</Link>

                                        {/*<Link to="/login" style={{ margin: '10px', textDecoration: 'none', color: 'white' }} onClick={()=>updateAuthentication(false)}>Logout</Link>*/}


                                    {/*<Link to="/adminDashboard" style={{ margin: '10px', textDecoration: 'none', color: 'white' }}>Admin</Link>*/}

                                        

                                        {/*<Button onClick={()=>updateAuthentication(false)} style={{ color: 'white' }}>Logout</Button>*/}

                                    </>
                                )}
                            </nav>
                            
                        </div>

                        <Routes>
                            <Route path="/" element={authenticated ? <Home userId={userId}/> : <Navigate to="/login" />} />
                            {/*<Route path="/categories" element={authenticated ? <Category userId={userId}/> : <Navigate to="/login" />} />*/}
                            <Route path="/browsecategories" element={authenticated ? <BrowseCategory userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/skill-offerings" element={authenticated ? <SkillOffering userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/registration" element={<Registration userId={userId}/>} />
                            <Route path="/skill-exchange" element={authenticated ? <SkillExchange userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/gig/:id" element={authenticated ? <Gig userId={userId} /> : <Navigate to="/login" />} />
                            <Route path="/gig-home/:id" element={authenticated ? <GigHome userId={userId} /> : <Navigate to="/login" />} />
                            <Route path="/search/" element={authenticated ? <SearchOffering query={query} userId={userId} /> : <Navigate to="/login" />} />
                            <Route path="/chat" element={authenticated ? <Chat userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/reviews" element={authenticated ? <Review userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/reviewList" element={authenticated ? <ReviewList userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/update-review/:id" element={authenticated ? <UpdateReview userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/profile" element={authenticated ? <Profile userId={userId}/> : <Navigate to="/login" />} />

                            <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login setUserId={setUserId} setAuthId={setAuthId}/>} />

                            <Route path="/login" element={authenticated ?  <Navigate to="/" /> :<Login setUserId={setUserId} setAuthId={setAuthId}/>} />

                            <Route path="/categories" element={authenticated && userId === 1 ? <Category userId={userId}/> : <Navigate to="/login" />} />
                            <Route path="/adminDashboard" element={authenticated && userId === 1 ? (<Dashboard userId={userId} />) : (<Navigate to={authenticated ? "/" : "/login"} />)}/>   

                         </Routes>
                    </Stack></Grid2>
                </div>
            </Router>
        </>
    );
};

export default App;
