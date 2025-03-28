import { Card, CardContent, Grid2, Stack, Typography, Box,TextField,Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

//ICONS
import '../LoginRegister.css'
import user_icon from '../assets/images/LoginRegistrationAssets/user_icon.png'
import user_password from '../assets/images/LoginRegistrationAssets/user_password.png'
import user_email from '../assets/images/LoginRegistrationAssets/user_email.png'
import user_calendar from '../assets/images/LoginRegistrationAssets/user_calendar.png'
import user_gender from '../assets/images/LoginRegistrationAssets/user_gender.png'
//CALENDAR THINGY
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import { Padding } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import RegistrationSuccess from "./RegistrationSuccess.jsx";


export default function Registration({ setIsRegistering,setDialogOpen,setDialogTitle,setDialogMessage }) {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const avatarRef = useRef();
    const [birthdate, setBirthdate] = useState(new Date());
    const [gender, setGender] = useState('');
    const navigate = useNavigate();
    const [verified,setVerified] = useState(false);

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/wildSkills/student',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const handleGenderInputChange = (e) => {
        setGender(e.target.value);
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await api.get(`/checkEmailExists?email=${email}`);
            return response.data.exists;
        } catch (error) {
            console.error('Error checking email', error);
            return false;
        }
    };
 /*
        const emailExists = await checkEmailExists(emailRef.current.value);
        if (emailExists) {
            alert("Email has already been used");
            return;
        }
            */
    const newStudent = async () => {
        if (
            nameRef.current.value === '' || 
            emailRef.current.value === '' || 
            passwordRef.current.value === '' || 
            confirmpasswordRef.current.value === '' || 
            gender === ''
        ) {
            setDialogOpen(true);
            setDialogTitle("Missing Fields");
            setDialogMessage("Fill All Fields");
            setVerified(false);
            return;
        }
        if (
            emailRef.current.value.includes("@yahoo.com")==false &&
            emailRef.current.value.includes("@gmail.com")==false
        ) {
            setDialogOpen(true);
            setDialogTitle("Invalid Email");
            setDialogMessage("Email must be a valid email address i.e (@yahoo.com or @gmail.com)");
            setVerified(false);
            return;
        }
        if (confirmpasswordRef.current.value !== passwordRef.current.value) {
            //alert("Passwords Don't Match");
            setDialogOpen(true);
            setDialogTitle("Password Mismatch");
            setDialogMessage("Passwords Don't Match");
            setVerified(false);
            return;
        }
        // Validate email (optional logic)
        // const emailExists = await checkEmailExists(emailRef.current.value);
        // if (emailExists) {
        //     alert("Email has already been used");
        //     return;
        // }
    
        //const avatarFile = avatarRef.current.files[0];
        const avatarFile = '';
        let avatarBase64 = null;
        
        if (avatarFile) {
            const reader = new FileReader();
            const promise = new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result.split(",")[1]); // Strip the `data:image/*;base64,` prefix
                reader.onerror = (err) => reject(err);
            });
            reader.readAsDataURL(avatarFile);
            avatarBase64 = await promise;
            console.log(avatarBase64)
        }
        /*
        let avatarBase64 = null;
        if (avatarFile) {
            //let avatarBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

            
            const reader = new FileReader(); 
            reader.readAsDataURL(avatarFile); 
            reader.onloadend = () => {avatarBase64 = (reader.result.split(',')[1]); // This will give you the base64 string without the prefix 
            console.log(avatarBase64);
            };



        }
        if (avatarBase64.startsWith("data:image/")) {
                avatarBase64 = avatarBase64.split(",")[1];
            }
            console.log(avatarBase64);
        */
            
    
        // Create the request payload
        const studentData = {
            name: nameRef.current.value,
            birthdate: birthdate.toISOString().split('T')[0],
            email: emailRef.current.value,
            password: passwordRef.current.value,
            gender: gender,
            avatar: avatarBase64,
        };
    
        try {
            const req = await api.post('/postStudentRecord', studentData);
    
            //alert("Registration Success");
            console.log(req.data);
            setVerified(true);
            setDialogOpen(true);
                            setDialogTitle("Registration Success");
                            setDialogMessage("You have succesfully registered!");
                            redirectToReg();
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            //alert("Error during registration. Please try again.");
            setDialogOpen(true);
            setDialogTitle("Registration Failed");
            setDialogMessage("Something went wrong dureing registration");
        }
    };
        
        
        

    const redirectToReg = () => {
        setIsRegistering(false);
    };

return (
    <Card
    sx={{
        minWidth: 400,
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
        <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
                Create Your Account
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
            Let's get started with your details
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


        <Stack spacing={3}>

        <TextField
            inputRef={nameRef}
            label="Full Name"
            variant="outlined"
            fullWidth
            placeholder="Enter your full name"
        />

        <Box>
            <Typography variant="body1" fontWeight="medium" mb={1}>
                Date of Birth
            </Typography>
            <DatePicker
                onChange={setBirthdate}
                value={birthdate}
                maxDate={new Date()}
                className="react-date-picker"
            />
        </Box>


        <Box>
            <Typography variant="body1" fontWeight="medium" mb={1}>
                Gender
            </Typography>
                <RadioGroup
                    row
                    value={gender}
                    onChange={handleGenderInputChange}
                    aria-labelledby="gender-radio-group-label"
                >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </Box>


        <TextField
            inputRef={emailRef}
            label="Email"
            variant="outlined"
            fullWidth
            placeholder="Enter your email address"
            type="email"
        />


        <TextField
            inputRef={passwordRef}
            label="Password"
            variant="outlined"
            fullWidth
            placeholder="Enter your password"
            type="password"
        />


        <TextField
            inputRef={confirmpasswordRef}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            placeholder="Re-enter your password"
            type="password"
        />


        {/*<Box>
            <Typography variant="body1" fontWeight="medium" mb={1}>
                Profile Picture
            </Typography>

            <Button
                variant="outlined"
                component="label"
                sx={{ width: "100%" }}
                >
                Upload Avatar
                <input ref={avatarRef} hidden accept="image/*" type="file" />
            </Button>
        </Box>*/}


        <Grid2 container spacing={2}
            sx={{
            justifyContent: "center"
            }}>
            <Grid2 xs={12} sm={6}>
                <Button
                    onClick={()=>{
                    newStudent();
                    
                }}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
                >
                Sign Up
                </Button>
        </Grid2>
        <Grid2 xs={12} sm={6}>
            <Button
                onClick={redirectToReg}
                variant="text"
                color="secondary"
                fullWidth
                sx={{ py: 1.5 }}
            >
                Already Have An Account?
            </Button>
        </Grid2>
    </Grid2>
    </Stack>
</Card>
);
}

