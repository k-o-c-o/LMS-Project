const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        res.json({
            message: "User saved successfully",
            user
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user)
        return res.status(404).json({ message: "User not found" })

    if (user.password !== password)
        return res.status(400).json({ message: "Invalid password" })

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    res.json({
        message: "Login successful",
        token
    })
}