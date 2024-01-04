import React from 'react'
import { Card, TextField, Typography, Button } from '@mui/material'
const Signup = () => {
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
            variant="filled" />
          <br /> <br />
          <TextField
            label="Password"
            fullWidth={true}
            type='password' />

          <br /><br />

          <Button size='large' variant="contained" color="warning">
            SingUp
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Signup