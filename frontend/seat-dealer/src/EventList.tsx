import React, {useEffect, useState} from "react";
import axios from "axios";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import {BottomNav, getAxiosConfigAuthenticated} from "./App";
import {useNavigate} from "react-router-dom";

export function EventList() {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(
            "http://localhost:5050/api/v1/events",
            getAxiosConfigAuthenticated()
        ).then(
            (response) => {
                console.log(response.data)
                setEvents(response.data)
            }
        )
    }, [])

    return <>
        <List>
            {events.map((c) => (
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={c['title']}/>
                    </ListItemButton>
                </ListItem>
            ))}

            <ListItem disablePadding>
                <ListItemButton onClick={() => {navigate('/add-event')}}>
                    <ListItemIcon>
                        <AddCircleOutline/>
                    </ListItemIcon>
                    <ListItemText primary="Add Event"/>
                </ListItemButton>
            </ListItem>
        </List>
    </>
}