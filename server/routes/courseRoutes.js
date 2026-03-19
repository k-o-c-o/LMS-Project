const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const role = require("../middleware/role")

const {
    createCourse,
    enrollCourse,
    getMyCourses
} = require("../controllers/courseController")

router.post("/create-course", auth, role("admin"), createCourse)

router.post("/enroll/:courseId", auth, role("student"), enrollCourse)

router.get("/my-courses", auth, role("student"), getMyCourses)

module.exports = router