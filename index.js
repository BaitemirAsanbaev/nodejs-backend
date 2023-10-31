require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
const authRouter = require("./router/auth-router")
const postRouter = require("./router/post-router")
const app = express()
const errorMiddleware = require("./middleware/error-middleware")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}))
app.use("/api/auth/", authRouter)
app.use("/api/post", postRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
        })
        app.listen(PORT, ()=> console.log("started at " + PORT))
    }
    catch (e){
        console.log(e.message)
    }
}

start()
