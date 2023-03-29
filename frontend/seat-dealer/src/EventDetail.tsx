import React, {useEffect, useState} from "react";
import axios from "axios";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import {BottomNav, getAxiosConfigAuthenticated} from "./App";
import {useNavigate} from "react-router-dom";

interface EventProps {
    id: number
}

export function EventDetail(props: EventProps) {
    const [event, setEvent] = useState({title: "", description: ""})
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(
            `http://localhost:5050/api/v1/events/${props.id}`,
            getAxiosConfigAuthenticated()
        ).then(
            (response) => {
                console.log(response.data)
                setEvent(response.data)
            }
        )
    }, [])

    return <>
        {event.description}
        <br />
        {event.title}
    </>
}