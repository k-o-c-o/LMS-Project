const Course = require("../models/Course")

exports.createCourse = async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user.id
    })

    await course.save()

    res.json({
        message: "Course created",
        course
    })
}

exports.enrollCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId)

    if (!course)
        return res.status(404).json({ message: "Course not found" })

    if (course.studentsEnrolled.includes(req.user.id))
        return res.status(400).json({ message: "Already enrolled" })

    course.studentsEnrolled.push(req.user.id)
    await course.save()

    res.json({ message: "Enrolled successfully" })
}

exports.getMyCourses = async (req, res) => {
    const courses = await Course.find({
        studentsEnrolled: req.user.id
    })

    res.json(courses)
}