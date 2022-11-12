const express = require('express')
const dotenv = require('dotenv')
const db = require('./db/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./router/auths')
// const {validateToken} = require("./router/VerifyToken")

const app = express()


// enable secure credentials
dotenv.config()
// ALLOW COOKIES
app.use(cookieParser())

// parse application/json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOption = { 
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST"],
    credentials: true,
    optionSuccessStatus:200,
}

app.use(cors(corsOption))


app.set('trust proxy', 1)

// app.use(express.static('build'))
app.use('/api/user',  authRoute)


db.authenticate().then((res)=> console.log('Connected to Legacy indexpro successfully.')
).catch((err) => console.error('Unable to connect to the database:', err));


app.listen(process.env.LOCAL_PORT, console.log("Connection started at", process.env.LOCAL_PORT));
