import { Card, TextField, Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Addcourse = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState(0)
  const [imageLink, setimageLink] = useState("")
  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", flexDirection: "column", backgroundColor: "greenyellow" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant='outlined' style={{ width: 400, backgroundColor: "beige", height: "100%", padding: 20, marginTop: 30 }}>
          <TextField
            style={{ marginBottom: 10 }}
            variant='outlined'
            id="title"
            label="title"
            fullWidth={true}
            onChange={(e) => settitle(e.target.value)}
          />

          <TextField
            style={{ marginBottom: 10 }}
            variant='outlined'
            id="description"
            label="description"
            fullWidth={true}
            onChange={(e) => setdescription(e.target.value)}
          />

          <TextField
            style={{ marginBottom: 10 }}
            variant='outlined'
            id="price"
            label="price"
            fullWidth={true}
            type='number'
            onChange={(e) => setprice(e.target.value)}
          />

          <TextField
            style={{ marginBottom: 10 }}
            variant='outlined'
            type="url"
            id="imageLink"
            label="image Link"
            fullWidth={true}
            onChange={(e) => setimageLink(e.target.value)}
          />

          <Button variant="contained" color="primary" size={"large"} onClick={async () => {
            const res = await axios.post("http://localhost:3000/admin/courses", {
              title: title,
              description: description,
              price: price,
              imageLink: imageLink,
              published: true
            }, {
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
            })
            const data = res.data
            console.log(data)
            alert("course Added")
          }}>
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Addcourse