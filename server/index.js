require('dotenv').config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose").default;
const router = require('./router/index')
const errorMiddleware = require("./middlewares/error-middleware")

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log("server is online"))
    }
    catch (e) {
        console.log("connect error")
    }
}

start();