import { Card, Grid2, Stack, Typography } from "@mui/material";
import '../LoginRegister.css'

export default function RegistrationSuccess(){
    return(
        <Card sx={{maxHeight:600, maxWidth: 400, padding: 4}}>
            <div className="container">
                <Typography variant="h5">You have succesfully registered!</Typography>
            </div>
        </Card>
    );
}