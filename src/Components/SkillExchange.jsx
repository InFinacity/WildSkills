import { Avatar, Button, Grid2, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, TextField, Select, MenuItem, InputLabel, Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import { Check, Delete, Reviews, CalendarMonth, ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import axios from 'axios'
import Chat from './Chat.jsx'
import { useNavigate } from "react-router-dom";
import wiski_banner from '../assets/images/HomeAssets/wiski-banner-full.png';

export default function SkillExchange({userId}) {
    const [exchange, setExchange] = useState([])
    const [id, setId] = useState();
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [scheduledStart, setScheduledStart] = useState('');
    const [scheduledEnd, setScheduledEnd] = useState('');

    const [isCompleted, setIsCompleted] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [currentExchange, setCurrentExchange] = useState(null)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openComplete, setOpenComplete] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const [chatter, setChatter] = useState();
    const [profilePics, setProfilePics] = useState({});
    const [profilePic,setProfilePic]= useState('');
    const [chatId, setChatId] = useState('');
    

    const navigate = useNavigate();

    const api = axios.create({
        baseURL: `http://localhost:8080/api/wildSkills/skillExchange/student/${userId}`,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const deleteExchange = (id) =>{
        api.delete(`/deleteSkillExchange/${id}`)
        .then(() =>{
            exchangeReload();
            setId('');
            setStatus('');
            setTitle('');
            setScheduledStart('');
            setScheduledEnd('');
            setIsSelected(false);
            setCurrentExchange(null);
            setOpenDelete(false);
        })
        .catch((error) =>{
            console.log('Error deleting Skill Exchange',error)
        })
    }

    const editExchange = () => {
        api.put(`/putSkillExchangeDetails?id=${id}`, {
            status: openComplete ? 'Completed':status,
            title,
            scheduledStart,
            scheduledEnd,
        })
        .then((response) =>{
            exchangeReload();
            setId('');
            setStatus('');
            setTitle('');
            setScheduledStart('');
            setScheduledEnd('');
            setIsSelected(false);
            setCurrentExchange(null);
            setOpenEdit(false);
            setOpenComplete(false);
            //console.log(response)
        })
        .catch((error) =>{
            console.log('Error editing Skill Exchange',error);
        })
    }

    const handleExchange = (id, status, title, scheduledStart, scheduledEnd, chatterId, chatId) =>{
        setId(id);
        setStatus(status);
        setTitle(title);
        setScheduledStart(scheduledStart);
        setScheduledEnd(scheduledEnd);
        setCurrentExchange({ id, status, title, scheduledStart, scheduledEnd, chatterId });
        setIsSelected(true);
        setChatId(chatId);
       //console.log(chatId);
    }

    const exchangeReload = () => {
        if (isCompleted){
            api.get('/completed')
            .then((exc) => {
                setExchange(exc.data);
                console.log(exc);
            })
            .catch((error) =>{
                console.log('Error reading Skill Exchange',error);
            });
        } else {
            api.get('/ongoing')
            .then((exc) => {
                setExchange(exc.data);
                //handleProfile(exc.data.chatterId);
                console.log(exc.data);
            })
            .catch((error) =>{
                console.log('Error reading Skill Exchange',error);
            });
        }
    }

    // Display pp sa ka chat
    const fetchProfilePic = async (chatterId) => {
        try {
            if (!profilePics[chatterId]) { // Avoid duplicate API calls
                const response = await axios.get(`http://localhost:8080/api/wildSkills/student/getUserStudentRecord?id=${chatterId}`);
                setProfilePics((prev) => ({...prev, [chatterId]: `data:image/png;base64,${response.data.avatar}`}));
            }
        } catch (error) {
            console.error(`Error fetching profile pic for chatterId ${chatterId}`, error);
        }
    };

    //skill exchange display/get
    useEffect(() =>{
        exchangeReload();
        //console.log(exchange);
    }, [isCompleted])
    useEffect(() =>{
        exchange.forEach((exc) => {
            if (exc.chatterId) {
                fetchProfilePic(exc.chatterId);
            }
        });
    }, [exchange])

    const handleReviewClick = () => {
        if (currentExchange) {
            navigate(`/reviews`, {
                state: { userId: userId, exchangeId: id },
            });
        } else {
            alert("Please select an exchange before leaving a review.");
        }
    };
    
    


    return (
        <>
            <Grid2 container spacing={2} direction="row" sx={{marginTop: 1.5, marginLeft: 2, marginRight: 2, width: '99%', minWidth: 'max-content'}}>
                <Grid2 item sx={{ boxShadow: 3, minHeight: "100%", minWidth: 400, maxWidth: 400, borderRadius: 3, backgroundColor: "#1e1e1e", overflowY: "auto", overflowX: "hidden" }}>
                    <Typography variant="h5" sx={{ justifySelf: "left", paddingLeft: 2, paddingTop: 1, color: '#ffffff' }}>Active Exchange</Typography>
                    <Stack direction={"row"} sx={{ marginLeft: 1, marginRight: 1, marginTop: 1 }}>
                        <Button onClick={() => setIsCompleted(false)} sx={{ backgroundColor: isCompleted ? '#2c2c2c':'#424242', color: '#ffffff', fontWeight: isCompleted ? 'normal':'bold', '&:focus': {outline: 'none'} }}>Ongoing</Button>
                        <Button onClick={() => setIsCompleted(true)} sx={{ backgroundColor: isCompleted ? "#424242":'#2c2c2c', color: '#ffffff', fontWeight: isCompleted ? 'bold':'normal', '&:focus': {outline: 'none'} }}>Completed</Button>
                    </Stack>

                    {exchange.sort((a, b) => b.skillExchangeID - a.skillExchangeID).map((exc, index) => (
                        <Grid2 key={index}
                            sx={{ //boxShadow: 4,
                                minHeight: 70,
                                margin: "auto",
                                marginTop: 0,
                                borderRadius: 3,
                                padding: 1,
                                marginLeft: 1,
                                marginRight: 1,
                                cursor: "pointer",
                                backgroundColor: "#1e1e1e",
                                transition: "background-color 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                    backgroundColor: "#333333",
                                    boxShadow: 6,
                                },
                            }}
                            onClick={() => { handleExchange(exc.skillExchangeID, exc.status, exc.title, exc.scheduledStart, exc.scheduledEnd, exc.chatterId, exc.chatId) }}>
                            <Stack direction={"row"}>
                                <Avatar
                                    alt="wiski-banner"
                                    variant="circle"
                                    src={profilePics[exc.chatterId]}
                                    sx={{
                                        width: '55px',
                                        height: '55px',
                                        marginRight: 1
                                    }}
                                />
                                <Stack direction={"column"} sx={{overflow: "hidden"}}>
                                    <Typography variant="h5" sx={{whiteSpace: 'nowrap', overflow: "hidden", textOverflow: 'ellipsis', maxWidth: '100%', color: '#ffffff'}}>{exc.title}</Typography>
                                    <Typography variant="body1" justifySelf={"left"} sx={{ color: '#bdbdbd' }}>{/*<strong>Status: </strong>*/}{exc.status}</Typography>
                                </Stack>
                            </Stack>
                            {/*<Typography variant="body2" justifySelf={"left"}>Scheduled Start: {new Date(exc.scheduledStart).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</Typography>
                            <Typography variant="body2" justifySelf={"left"}>Scheduled End: {new Date(exc.scheduledEnd).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</Typography>*/}
                        </Grid2>
                    ))}
                </Grid2>

                <Grid2>
                    <Chat userId={userId} chatId={chatId}/>
                </Grid2>

                <Grid2 item sx={{ boxShadow: 3, minHeight: 700, minWidth: 400, maxWidth: 400, borderRadius: 3, backgroundColor: "#1e1e1e", padding: 2 }}>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="column">
                            <Avatar
                                alt="wiski-banner"
                                variant="circle"
                                src={profilePics[currentExchange?.chatterId]}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    margin: 'auto',
                                    marginBottom: 1
                                }}
                            />
                            <Typography variant="h5" sx={{ alignSelf: "center", textAlign: "center", fontWeight: 'bold', color: '#ffffff'}}>
                                {currentExchange ? currentExchange.title : 'Select an Exchange'}
                            </Typography>
                            <Typography variant="body1" sx={{ alignSelf: "center", color: '#9e9e9e', marginBottom: 2 }}>
                                {currentExchange ? currentExchange.status : ''}
                            </Typography>
                            
                            {isSelected && (
                                <Stack direction="row" alignItems="center" sx={{ alignSelf: "center", color: '#9e9e9e'}}>
                                    <CalendarMonth sx={{marginRight: 1}}/>
                                    <Typography variant="body1" sx={{ alignSelf: "center", color: '#9e9e9e' }}>
                                        Scheduled Start:
                                    </Typography>
                                </Stack>
                            )}
                            <Typography variant="body1" sx={{ alignSelf: "center", color: '#9e9e9e' }}>
                                    {currentExchange ? new Date(currentExchange.scheduledStart).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : ''}
                            </Typography>

                            {isSelected && (
                                <Stack direction="row" alignItems="center" sx={{ alignSelf: "center", color: '#9e9e9e', marginTop: 2 }}>
                                    <CalendarMonth sx={{marginRight: 1}}/>
                                    <Typography variant="body1" sx={{ alignSelf: "center", color: '#9e9e9e' }}>
                                        Scheduled End:
                                    </Typography>
                                </Stack>
                            )}
                            <Typography variant="body1" sx={{ alignSelf: "center", color: '#9e9e9e', marginBottom: 2 }}>
                                {currentExchange ? new Date(currentExchange.scheduledEnd).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : ''}
                            </Typography>
                        </Stack>

                        {isSelected && currentExchange.status !== 'Completed' && (
                            <>
                                <Button
                                    variant="text"
                                    onClick={() => setDropDown(!dropDown)}
                                    endIcon={dropDown ? <ArrowDropUp/> : <ArrowDropDown/>}
                                    sx={{ maxWidth: '100%', minWidth: 250, alignSelf: 'left', fontWeight: 'bold', color: "#ffffff", borderColor: "#b03d3d", '&:focus': {outline: 'none'}}}
                                >
                                    Exchange Actions
                                </Button>
                                <Collapse in={dropDown}>
                                    <Stack direction="column" spacing={0}>
                                        <Button
                                            variant="text"
                                            onClick={() => setOpenEdit(true)}
                                            startIcon={<CalendarMonth/>}
                                            sx={{ maxWidth: '100%', minWidth: 250, alignSelf: 'left', fontWeight: 'bold', color: "#ffffff", borderColor: "#b03d3d", '&:focus': {outline: 'none'}}}>
                                            Set Schedule
                                        </Button>
                                        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                                            <DialogTitle>Set Schedule</DialogTitle>
                                            <DialogContent>
                                                <Stack alignItems={"center"}> 
                                                    <FormControl fullWidth margin="normal">
                                                        <TextField
                                                            id="scheduledStart"
                                                            label="Update Schedule Start"
                                                            type="datetime-local"
                                                            value={scheduledStart}
                                                            onChange={(e) => setScheduledStart(e.target.value)}
                                                            sx={{marginBottom: 2}}
                                                        />
                                                        <TextField
                                                            id="scheduledEnd"
                                                            label="Update Schedule End"
                                                            type="datetime-local"
                                                            value={scheduledEnd}
                                                            onChange={(e) => setScheduledEnd(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </DialogContent> 
                                            <DialogActions>
                                                <Button onClick={() => setOpenEdit(false)} sx={{color: "#b03d3d", '&:focus': {outline: 'none'}}}>Cancel</Button>
                                                <Button onClick={() => {editExchange()}} sx={{color: "#b03d3d", '&:focus': {outline: 'none'}}}>Submit</Button>
                                            </DialogActions>
                                        </Dialog>
                                        
                                        <Button
                                            variant="text"
                                            onClick={() => setOpenComplete(true)}
                                            startIcon={<Check/>}
                                            sx={{ maxWidth: '100%', minWidth: 250, alignSelf: 'left', fontWeight: 'bold', color: "#ffffff", borderColor: "#b03d3d", '&:focus': {outline: 'none'}}}>
                                            Complete Exchange
                                        </Button>
                                        <Dialog open={openComplete} onClose={() => setOpenComplete(false)}>
                                            <DialogTitle>Complete Exchange?</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>The exchange will be marked as completed.</DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setOpenComplete(false)} sx={{color: "#b03d3d", '&:focus': {outline: 'none'}}}>Cancel</Button>
                                                <Button onClick={() => {editExchange()}} sx={{color: "#b03d3d", '&:focus': {outline: 'none'}}}>Complete</Button>
                                            </DialogActions>
                                        </Dialog>

                                        <Button
                                            variant="text"
                                            onClick={() => setOpenDelete(true)}
                                            startIcon={<Delete/>}
                                            sx={{ maxWidth: '100%', minWidth: 250, alignSelf: 'left', fontWeight: 'bold', color: "#ffffff", borderColor: "#b03d3d", '&:focus': {outline: 'none'}}}>
                                            Cancel Exchange
                                        </Button>
                                        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                                            <DialogTitle>Cancel Exchange?</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>Are you sure you want to cancel the exchange?</DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setOpenDelete(false)} sx={{color: "#b03d3d", '&:focus': {outline: 'none'}}}>Cancel</Button>
                                                <Button onClick={() => { deleteExchange(id) }} sx={{color: "#b03d3d", '&:focus': {outline: 'none'}}}>Delete</Button>
                                            </DialogActions>
                                        </Dialog>
                                        
                                        <Button
                                            variant="text"
                                            onClick={() => { handleReviewClick() }}
                                            startIcon={<Reviews/>}
                                            sx={{ maxWidth: '100%', minWidth: 250, alignSelf: 'left', fontWeight: 'bold', color: "#ffffff", borderColor: "#b03d3d", '&:focus': {outline: 'none'}}}
                                        >
                                            Review User
                                        </Button>
                                    </Stack>
                                </Collapse>
                            </>
                        )}
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    )    
}