import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Appbar from './components/Appbar'
import Addcourse from './components/Addcourse'
import Login from './components/Login'
import Signup from './components/Signup'
import Courses from './components/Courses'
import Course from './components/Course'


function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "gray", boxSizing: "border-box" }}>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path={'/addcourse'} element={<Addcourse />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/courses"} element={<Courses />} />
          <Route path={"/course/:courseId"} element={<Course />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
