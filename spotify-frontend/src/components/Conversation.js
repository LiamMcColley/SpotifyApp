import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Forum from './IndivForum.js'
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IndivForum from "./IndivForum.js";
import TextField from '@mui/material/TextField';
import { border } from "@mui/system";
import {buttonStyle, divStyleMessageSent, divStyleMessageRec} from './pagecss.js';



function Conversation() {
    const location = useLocation();
    const contact = location.state?.contact
    const userName = location.state?.userName
    const messageRef = useRef(null);
    const [conversation, setConversation] = useState()

    useEffect(() => {
        fetch("http://localhost:9000/inbox/indivConversation?name=" + userName + "?" + contact)
            .then((res) => res.json())
            .then((text) => setConversation(text.result))
            .catch((err) => console.log(err))
    }, [])


    const sendMessage = (e) => {
        e.preventDefault();  // no reloading the page
        var current = new Date();
        axios.post("http://localhost:9000/inbox/newMessage", {
            name: userName,
            otherUser: contact,
            Message: messageRef.current.value
        })

            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))


        console.log(conversation)
        const message=messageRef.current.value

        setConversation([{ user: userName,
            otherUser: contact,
            message: message,
            sent: true}, ...conversation])
        messageRef.current.value = ""
        //window.location.reload(false);
    }

    return (
        <div className="IndivConversation">
           <div style={{

        margin: "20px"}}>
            <Link to="/Inbox">Return to Inbox</Link> 
            <h1>{contact}</h1>
        </div>
        <center>
        <form onSubmit={sendMessage} >
                <TextField varient='outlined'
                    id="outlined-basic"
                    variant="outlined"
                    label="New Message"
                    inputRef={messageRef}
                    sx={{width: "500px"}}
                /><br></br><br></br>
                <Button type="submit"
                    variant='outlined'
                    sx={{ color: '#000000', borderColor: '#000000', borderRadius: '25px' }}>Send<br></br>
                </Button>
        </form>
        <br></br><hr></hr>
        </center>
        
        {conversation && conversation.map((c, index) => 
            {return c.sent ?
                <div>
                    <center>
                    <div  style={divStyleMessageSent}>
                        <p>{c.message}</p>
                    </div> <br></br>
                    </center>
                </div>:
                <div>
                    <center>
                        <div  style={ divStyleMessageRec}>
                            <p>{c.message}</p> 
                        </div><br></br>
                    </center>
                </div>
            } 
        )}
    </div>
  );
}
export default Conversation;