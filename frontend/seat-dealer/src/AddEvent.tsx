import axios from "axios";
import React, {useState} from "react";
import {Button, Container, TextField} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import {AddCircleOutline} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

async function postEventToApi(title: string, description: string) {
    const authToken = localStorage.getItem('authToken')
    const axiosConfig = {
        headers: {'Authorization': `Bearer ${authToken}`}
    }
    await axios.post('http://localhost:5050/api/v1/events', {
        title,
        description,
        ownerEmail: localStorage.getItem('email')
    }, axiosConfig)
}

export function AddEvent() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();

    return <>
        <Container>
            <TextField
                fullWidth
                margin="normal"
                id="title-field"
                label="Title"
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(event.target.value);
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                id="description-field"
                label="Description"
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDescription(event.target.value);
                }}
                multiline
                maxRows={6}
            />

            <Button variant="outlined" startIcon={<AddCircleOutline/>} onClick={() => {
                postEventToApi(title, description).then(() => {

                    navigate("/events");
                })
            }}>
                Add
            </Button>
        </Container>
    </>
}