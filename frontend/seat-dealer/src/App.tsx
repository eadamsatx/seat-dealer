import React, {useEffect, useState} from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Container,
    CssBaseline,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {ChairAlt, Contacts, EventSeat} from '@mui/icons-material';
import ContactRsvpDropdown from "./dropdown";
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google';
import GoogleCreds from "./GoogleCreds";
import {AddContact} from "./AddContact";
import {ContactList} from "./ContactList";
import {EventList} from "./EventList";
import {AddEvent} from "./AddEvent";
import {EventDetail} from "./EventDetail";

export function getAxiosConfigAuthenticated() {
    const authToken = localStorage.getItem('authToken')
    return {
        headers: {'Authorization': `Bearer ${authToken}`}
    }
}
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

export function BottomNav() {
    const [nav, setNav] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        if(nav === 0) {
            navigate("/");
        } else {
            navigate('/events')
        }
    }, [nav])
    return <>
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
                        <Route path="/add-event" element={<AddEvent />} />
                        <Route path="/invite/*" element={<ContactInvite />} />
                        <Route path="/" element={<ContactList />} />
                        <Route path="/events" element={<EventList />} />
                        {/*<Route path="/events/:id" element={<EventDetail />} />*/}
                    </Routes>
                    <BottomNav />
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    );
}
export default App;