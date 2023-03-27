/*App.js*/

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Logout } from '@mui/icons-material'
import {Button, Typography} from "@mui/material";

function GoogleCreds() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            setUser(credentialResponse)
            console.log(credentialResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <>
            {profile ? (
                <>
                    <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1 }}>{profile.name}</Typography>
                    <Button variant="contained" onClick={logOut} align="right">Logout<Logout /></Button>
                </>
            ) : (
                <Button variant="contained" onClick={() => login()}>Login</Button>
            )}
        </>
    );
}
export default GoogleCreds;