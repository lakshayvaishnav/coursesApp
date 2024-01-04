const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

app.use(express.json());
app.use(cors());
const secretKey = "supers3cret";

// defining schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// defining mongoose models...
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const authenticateJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401);
  }
};

mongoose
  .connect(
    "mongodb+srv://thelakshayvaishnav:1dUo1DnEvfnSvRPT@cluster0.ziuxmyd.mongodb.net/courses"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// mongoose
//   .connect("mongodb://localhost:27017/courses")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// /signup  route
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(404).json({ message: "admin already existed" });
  } else {
    const obj = { username, password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Admin created Successfully", token });
  }
});

// login route
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "Admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in Successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

// get admin detail route
app.get("/admin/me", authenticateJwt, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

// add course
app.post("/admin/courses", authenticateJwt, async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({
    message: "new course created successfully...",
    courseId: newCourse.id,
  });
});

// get all courses

app.get("/admin/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// get course with id
app.get("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const getCourse = await Course.findOne({ _id: courseId });
  if (getCourse) {
    res.json({ message: "course Found...", course: getCourse });
  } else {
    res.json({ message: "course not found..." });
  }
});

// admin edit course
app.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

// user Routes

// user signup
app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json({ message: "user already existed" });
  } else {
    const obj = { username, password };
    const newUser = new User(obj);
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "user created successfully", token });
  }
});

// user login
app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  console.log(user);
  if (user) {
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "user loggedin successfully", token });
  } else {
    res.json({ message: "failed to login incorrect username or password" });
  }
});

// get user courses
app.get("/user/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json(courses);
});

// purchase course
app.post("/user/courses/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "course purchased successfully" });
    } else {
      res.json({ message: "user not found" });
    }
  } else {
    res.json({ message: "course not found" });
  }
});

// /get purchased courses
app.get("/user/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

server.listen(3000, () => {
  console.log("server is running on 3000");
});
