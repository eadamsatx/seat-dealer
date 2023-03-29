/*App.js*/

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Logout } from '@mui/icons-material'
import {Button, Typography} from "@mui/material";

function GoogleCreds() {
    const [ profile, setProfile ] = useState({});
    const storedAuthToken = localStorage.getItem('authToken');

    if(!!storedAuthToken && storedAuthToken !== profile.authToken) {
        setProfile({
            authToken: localStorage.getItem('authToken'),
            email: localStorage.getItem('email'),
            name: localStorage.getItem('name')
        })
    }
    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            const authInfo = await axios.post(`http://localhost:5050/api/v1/login`, {code: credentialResponse.code})
            setProfile(authInfo.data)
            localStorage.setItem('authToken', authInfo.data.authToken)
            localStorage.setItem('email', authInfo.data.email)
            localStorage.setItem('name', authInfo.data.name)
        },
        flow: 'auth-code'
    });

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [ user ]
    // );

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