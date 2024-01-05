import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Card, Button, useScrollTrigger, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 150, marginBottom: 10 }}>

        <Typography variant="h4" color="initial">Welcome to Coursera login below</Typography>

      </div >

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant='outlined' style={{ width: 400, padding: 20 }}>
          <TextField
            id="Email"
            label="Email"
            fullWidth={true}
            onChange={(e) => setemail(e.target.value)}
          />
          <br /><br />
          <TextField
            id="password"
            label="password"
            fullWidth={true}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br /><br />
          <Button variant="contained" color="primary" onClick={async () => {
            const res = await axios.post("http://localhost:3000/admin/login", {
              username: email,
              password: password
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            })
            const data = res.data
            console.log(data)
            localStorage.setItem("token", data.token)

            navigate("/courses")
          }}>
            Login
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Login