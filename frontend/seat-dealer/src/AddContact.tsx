import axios from "axios";
import React, {useState} from "react";
import {Button, Container, TextField} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import {AddCircleOutline} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

async function postContactToApi(name: string, email: string, phoneNumber: string) {
    const authToken = localStorage.getItem('authToken')
    const axiosConfig = {
        headers: {'Authorization': `Bearer ${authToken}`}
    }
    await axios.post('http://localhost:5050/api/v1/contacts', {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        ownerEmail: localStorage.getItem('email')
    }, axiosConfig)
}

export function AddContact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate();

    async function handlePhoneNumberChange(value: string) {
        value = '+' + value.replace(/\D/g, "")
        console.log(value)
        setPhoneNumber(value);
    }


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
            <MuiPhoneNumber
                fullWidth
                defaultCountry={'us'}
                onChange={handlePhoneNumberChange}
                // value={phoneNumber}
                label="Phone Number"
                margin="normal"
            />

            <Button variant="outlined" startIcon={<AddCircleOutline/>} onClick={() => {
                postContactToApi(name, email, phoneNumber).then(() => {

        navigate("/");
        console.log('navigated')
    })
            }}>
                Add
            </Button>
        </Container>
    </>
}