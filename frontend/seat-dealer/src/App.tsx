import React from 'react';
import {Typography, AppBar, CssBaseline, Toolbar, Container} from "@mui/material";
import {ChairAlt} from '@mui/icons-material';
import ContactRsvpDropdown from "./dropdown";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleCreds from "./GoogleCreds";
function ContactInvite() {
    return         <main>
        <div>
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
        </div>
    </main>
}

function MainContainer() {

    return <>



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
                    <Route path="/invite/*" element={<ContactInvite />} />
                    <Route path="/" element={<MainContainer />} />
                </Routes>
            </BrowserRouter>
                </GoogleOAuthProvider>
        </>
    );
}
export default App;