import React, {useEffect, useState} from "react";
import axios from "axios";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import {BottomNav, getAxiosConfigAuthenticated} from "./App";

export function ContactList() {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        axios.get(
            "http://localhost:5050/api/v1/contacts",
            getAxiosConfigAuthenticated()
        ).then(
            (response) => {setContacts(response.data)}
        )
    }, [])

    return <>
        <List>
            {contacts.map((c) => (
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={c['name']} />
                    </ListItemButton>
                </ListItem>
            ))}

            <ListItem disablePadding>
                <ListItemButton component='a' href='/add-contact'>
                    <ListItemIcon>
                        <AddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add Contact" />
                </ListItemButton>
            </ListItem>
        </List>
        <BottomNav />
    </>
}