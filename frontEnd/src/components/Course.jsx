import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Course = () => {
    let { courseId } = useParams()


    useEffect(() => {
        axios.get(`http://localhost/admin/course/${courseId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
    })
    return (
        <div>Course</div>
    )
}

export default Course