import React, {useState} from 'react';
import {
    Typography,
    AppBar,
    CssBaseline,
    Toolbar,
    Container,
    BottomNavigation,
    BottomNavigationAction, Paper, ListItemIcon, List, ListItemText, ListItem, ListItemButton, TextField, Button
} from "@mui/material";
import {ChairAlt, EventSeat, Contacts, AddCircleOutline} from '@mui/icons-material';
import ContactRsvpDropdown from "./dropdown";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleCreds from "./GoogleCreds";
import axios from "axios";
function ContactInvite() {
    return <main>
        <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="text-primary" gutterBottom>
                Microstakes Poker
            </Typography>
            <Typography variant="h4" align="center" color="text-secondary" gutterBottom>April 1, 2023 @ 7pm</Typography>
            <Typography variant="h5" align="center" color="text-secondary" paragraph>
                25¢/50¢ No Limit Hold'em, $60 max buy in. Contact host directly for location and entry instructions.
            </Typography>
            <ContactRsvpDropdown />
        </Container>
    </main>
}

async function postContactToApi(name:string, email:string, phoneNumber:string) {
    await axios.post('http://localhost:5050/api/v1/contacts', {
        name: name,
        email: email,
        phoneNumber: phoneNumber
    })
}

function AddContact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    return <>
        <Container>
            <TextField
                fullWidth
                margin="normal"
                id="name-field"
                label="Name"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                id="email-field"
                label="Email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                id="phone-number-field"
                label="Phone Number"
                value={phoneNumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPhoneNumber(event.target.value);
                }}
            />
            <Button variant="outlined" startIcon={<AddCircleOutline />} onClick={() => {postContactToApi(name, email, phoneNumber)}}>
                Add
            </Button>
        </Container>
    </>
}

function MainContainer() {
    const [nav, setNav] = useState('')
    return <>
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Jason" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href='/add-contact'>
                    <ListItemIcon>
                        <AddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add Contact" />
                </ListItemButton>
            </ListItem>
        </List>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={nav}
                onChange={(event, newValue) => {
                    setNav(newValue);
                }}
            >
                <BottomNavigationAction label="Contacts" icon={<Contacts />} />
                <BottomNavigationAction label="Events" icon={<EventSeat />} />
            </BottomNavigation>
        </Paper>


    </>
}
function App() {
    return (
        <>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID as string}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <ChairAlt />
                        <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>Seat Dealer</Typography>
                        <GoogleCreds />
                    </Toolbar>
                </AppBar>
                <BrowserRouter>
                    <Routes>
                        <Route path="/add-contact" element={<AddContact />} />
                        <Route path="/invite/*" element={<ContactInvite />} />
                        <Route path="/" element={<MainContainer />} />
                    </Routes>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    );
}
export default App;