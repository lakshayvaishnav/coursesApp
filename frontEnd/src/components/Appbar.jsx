import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Button, Stack, Alert } from "@mui/material"
import { MenuBook } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'
const Appbar = () => {
    const navigate = useNavigate()
    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: 10,backgroundColor:"peru" }}>
            <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
                <Typography variant="h6" color="initial">
                    Coursera
                </Typography>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                    <Button variant="contained" color="secondary" onClick={() => { navigate("/signup") }}>
                        SignUp
                    </Button>
                </div>

                <div>
                    <Button variant="contained" color="secondary" onClick={() => { navigate('/login') }}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Appbar