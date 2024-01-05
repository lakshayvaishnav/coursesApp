import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
    const [courses, setcourses] = useState([])

    const init = async () => {
        const res = await axios.get("http://localhost:3000/admin/courses", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = res.data
        setcourses(data)
        console.log(data)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {courses.map(course => {
                return <Course course={course} />
            })}
        </div>
    )
}

export const Course = ({ course }) => {
    const navigate = useNavigate()
    return <Card style={{
        margin: 10,
        width: 400,
        minHeight: 200,

    }}>

        <Typography textAlign={"center"} variant='h5'>{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1" >{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 400, justifyContent: "center" }} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20, padding: 30 }}>
            <Button variant="contained" color="primary"size='large' onClick={() => {
                navigate("/course/" + course._id)
            }}>
                Edit
            </Button>
        </div>
    </Card>
}


export default Courses