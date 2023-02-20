/**
 * https://youtu.be/5z6gy4WGnUs
 */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express();
// const session = require("express-session");
// const Keycloak = require("keycloak-connect");
import middleware from './middleware.js'

app.use(express.json())
app.use(cors());

const data = ["corn", "wheat", "rice", "hot"];

app.get("/api/documents", middleware, (req, res, next) => {
    console.log("req.user", res.locals)
    // const {email} = res.locals
    return res.send(data)
})

app.listen(4000, () => {
    console.log("Server is running!");
})
