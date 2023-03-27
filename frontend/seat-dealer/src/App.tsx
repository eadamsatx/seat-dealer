import React from 'react';
import MyDropdown from "./dropdown";
import {Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline,
Grid, Toolbar, Container} from "@mui/material";
import {ChairAlt} from '@mui/icons-material';
import ContactRsvpDropdown from "./dropdown";

function App() {
  return (
    <>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
                <ChairAlt />
                <Typography variant="h6">Seat Dealer</Typography>
            </Toolbar>
        </AppBar>
        <main>
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
    </>
  );
}
export default App;