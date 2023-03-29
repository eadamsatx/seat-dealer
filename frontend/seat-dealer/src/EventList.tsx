import React, {useEffect, useState} from "react";
import axios from "axios";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import {BottomNav, getAxiosConfigAuthenticated} from "./App";

export function EventList() {
    const [events, setEvents] = useState([])
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
                <ListItemButton component='a' href='/add-contact'>
                    <ListItemIcon>
                        <AddCircleOutline/>
                    </ListItemIcon>
                    <ListItemText primary="Add Contact"/>
                </ListItemButton>
            </ListItem>
        </List>
    </>
}