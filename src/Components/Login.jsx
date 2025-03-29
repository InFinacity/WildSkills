import React, { useRef, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Box, Grid2, Stack,
        Dialog,DialogTitle,DialogContent,
        DialogContentText,DialogActions,
 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../LoginRegister.css';
import wiski_banner from '../assets/images/HomeAssets/wiski-banner-full.png';
import wiski_cat from '../assets/images/HomeAssets/wiski-cat.png';
import Registration from './Registration';

//for the font
import '../Home.css';

export default function Login({ setUserId, setAuthId}) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");

    const isDevelopment = window.location.hostname === 'localhost';
    //const baseURL = isDevelopment ? 'https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/student' : 'http://localhost:8080/api/wildSkills/student';
    //const authBaseURL = isDevelopment ? 'https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/authentication' : 'http://localhost:8080/api/wildSkills/authentication';

    const baseURL = 'https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/student';
    const authBaseURL = 'https://bbf3-2001-4454-5a9-fb00-7835-d9-9077-1d8b.ngrok-free.app/api/wildSkills/authentication';

    const api = axios.create({
        baseURL: baseURL,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    const apiAuth = axios.create({
        baseURL: authBaseURL,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    /*
    const api = axios.create({
        baseURL: "http://localhost:8080/api/wildSkills/student",
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    const apiAuth = axios.create({
        baseURL: "http://localhost:8080/api/wildSkills/authentication",
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    */
    const handleLogin = async () => {
        try {
            const response = await api.post("/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            if (response.data.status === "Login Successful") {
                const { studentId, authId } = response.data;
                if (studentId) {
                    await apiAuth.put(`/putIncrementAuthenticationDetails?authId=${authId.authId}`);
                    await apiAuth.put(`/putUpdateAuthenticationStatus?authId=${authId.authId}`,true);

                    setUserId(studentId);
                    setAuthId(authId.authId);

                    setTimeout(() => {
                        navigate("/");
                    }, 100);
                } else {
                    openDialog("Login failed","no studentId received.");
                }
            } else {
                openDialog("Login Failed" , response.data.message);
            }
        } catch (error) {
            console.error("Error during login", error);
            openDialog("Error during login " , error.message);
        }
    };

    const redirectToReg = () => {
        navigate("/registration");
    };

    const openDialog = (title, message) => {
        setDialogTitle(title);
        setDialogMessage(message);
        setDialogOpen(true);
    };
    
    const closeDialog = () => {
        setDialogOpen(false);
        setDialogTitle("");
        setDialogMessage("");
    };

    return (
        <Grid2
        container
        sx={{
            minHeight: '100vh',
            minWidth: '99vw',
            //paddingTop:0.1,
            alignItems:'center',
            justifyContent:'center',
            backgroundImage: `url(${wiski_banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            //minHeight: '78vh',
            //minWidth: '100vw',
            
            display: 'flex',
            
            

        }}>
            <Grid2
            sx={{
                //backgroundColor:"white",
                maxWidth:1200,
                maxHeight:800,
                alignContent: "center",
                justifyContent: 'center',
                //backgroundColor: 'gray',
                
            }}>
                <Stack direction={"row"}>
                    
                <Grid2
                sx={{
                    minWidth:400,
                    minHeight:400,
                    color: 'Black',
                    
                    
                    //backgroundColor: "gray",
                    
                    
                }}>
                    
                    <Box
                    sx={{
                        minWidth:750,
                        minHeight:455,
                        color: 'Black',
                        //backgroundColor: "gray",
                        backgroundImage: `url(${wiski_cat})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '60%',
                        backgroundPosition: 'top',
                        position: "relative",
                        opacity:'80%',
                        //backgroundBlendMode: 'lighten',
                        alignContent: "center",
                        justifyContent: 'center',
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        //paddingRight: 30,
                        marginTop:9,
                        marginRight:2,
                        paddingTop: 4
                        

                        
                    }}>
                        {/*
                        <img 
                        src={wiski_cat}
                        style={{
                            width:110,
                            height:50,
                        }}
                        />*/}
                        <Stack direction={"row"}>
                            
                        <Typography
                            sx={{ fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'Etna',
                                letterSpacing: 10,
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontSize:50,
                                lineHeight: 1,
                                opacity:'100%',
                                
                                
                            }} 
                        >Share</Typography>
                        <Typography
                            sx={{ fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Etna',
                                letterSpacing: 10,
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontSize:50,
                                lineHeight: 1,
                                opacity:'100%',
                                paddingLeft: 3
                                
                            }} 
                        >your</Typography>
                        <Typography
                            sx={{ fontWeight: 'bold',
                                color: '#ff5757',
                                textAlign: 'left',
                                fontFamily: 'Etna',
                                letterSpacing: 10,
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontSize:50,
                                lineHeight: 1,
                                opacity:'100%',
                                paddingLeft: 3
                                
                            }} 
                        >talents</Typography>
                        </Stack>
                        <Grid2 container spacing={2}>
                            <Stack direction={'row'}>
                                
                        <Typography
                            sx={{ fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Etna',
                                letterSpacing: 10,
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontSize:50,
                                lineHeight: 1,
                                paddingLeft:8,
                                opacity:'100%'
                                
                            }} 
                        >with </Typography>
                        
                        <Typography
                            sx={{ fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'left',
                                fontFamily: 'Etna',
                                letterSpacing: 10,
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                fontSize:50,
                                lineHeight: 1,
                                opacity:'100%',
                                paddingLeft:3
                                
                            }} 
                        >Wild</Typography>
                        <Typography
                        sx={{ fontWeight: 'bold',
                                color: '#ffde59',
                                textAlign: 'left',
                                    fontFamily: 'Etna',
                                    letterSpacing: 10,
                                    textTransform: 'uppercase',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    fontSize:50,
                                    lineHeight: 1,
                                    opacity:'100%',
                                    //paddingLeft:2
                                
                            }} 
                        >skills</Typography>
                            
                        
                            </Stack>
                        </Grid2>
                    </Box>
                    
                    
                </Grid2>
                <Grid2>
                {!isRegistering && (
                    
                    <Card
                    sx={{
                        maxWidth: 400,
                        margin: "auto",
                        //marginTop: 8,
                        padding: 3,
                        boxShadow: 3,
                        borderTopRightRadius:10,
                        borderBottomRightRadius:10,
                        backgroundColor: '#ffe6d1',
                        opacity: '90%'
                        
                        
                    }}
                >
                    <CardContent>
                        
                        <Box textAlign="center" mb={3}>
                            <Typography variant="h4" gutterBottom 
                            sx={{
                                fontFamily: 'Proxima Nova Bold',
                            }}>
                                Login
                            </Typography>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 4,
                                    backgroundColor: "#ffc400",
                                    margin: "0 auto",
                                    
                                }}
                            />
                        </Box>
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                inputRef={emailRef}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                inputRef={passwordRef}
                                variant="outlined"
                                margin="normal"
                            />
                        </Box>
                        <Grid2 container spacing={2}
                        sx={{
                            justifyContent:"center"
                        }}>
                            <Grid2 item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleLogin}
                                >
                                    Submit
                                </Button>
                            </Grid2>
                            <Grid2 item xs={12}>
                                <Button
                                    variant="text"
                                    color="secondary"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                    onClick={()=>setIsRegistering(true)}
                                >
                                    No Account Yet? Register Now
                                </Button>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
                )}
                {isRegistering && (
                    <>
                    <Grid2
                    sx={{
                        //backgroundColor:'#ffe6d1'

                    }}>
                        <Registration setIsRegistering={setIsRegistering} setDialogOpen={setDialogOpen} setDialogTitle={setDialogTitle} setDialogMessage={setDialogMessage}/>
                    </Grid2>
                    
                    </>
                    
                     
                )}
                </Grid2>
                </Stack>
            </Grid2>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                >
                <DialogTitle id="dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid2>
    );
}
