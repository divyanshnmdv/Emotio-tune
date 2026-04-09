const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URI,
    credentials:true
}))


const authRoutes = require("./routes/auth.route")
const songRoutes = require("./routes/songs.route")

app.use("/api/auth", authRoutes)
app.use("/api/songs",songRoutes)


module.exports = app