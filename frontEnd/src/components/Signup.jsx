import React, { useState } from 'react'
import { Card, TextField, Typography, Button } from '@mui/material'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  return (
    <div>
      <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>

      <div style={{ justifyContent: "center", display: "flex" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            label="Email" 
            fullWidth={true}
            variant="filled"
            onChange={(e) => { setemail(e.target.value) }} />
          <br /> <br />
          <TextField
            label="Password"
            fullWidth={true}
            type='password'
            onChange={(e) => {
              setpassword(e.target.value)
            }} />

          <br /><br />

          <Button size='large' variant="contained" color="warning" onClick={async () => {
            const response = await axios.post("http://localhost:3000/admin/signup", {
              username: email,
              password: password
            })
            let data = response.data
            localStorage.setItem("token", data.token)
            console.log(data)
            navigate("/courses")
          }}>
            SingUp
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Signup