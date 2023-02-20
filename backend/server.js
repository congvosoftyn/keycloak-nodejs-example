/**
 * https://youtu.be/5z6gy4WGnUs
 */
import 'dotenv/config'
import express, { response } from 'express'
import cors from 'cors'
const app = express();
// const session = require("express-session");
// const Keycloak = require("keycloak-connect");
import middleware from './middleware.js'
import request from 'request';
import { keycloakHost, keycloakPort, myClient, realmName } from './config/key.js';

app.use(express.json())
app.use(cors());

const data = ["corn", "wheat", "rice", "hot"];

app.get("/api/documents", middleware, (req, res, next) => {
    console.log("req.user", res.locals)
    return res.send(data)
})

app.post("/api/users/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const URI = `http://${keycloakHost}:${keycloakPort}/realms/${realmName}/protocol/openid-connect/token`;
       request(URI, {
            method:"POST",
            body: JSON.stringify({
                "grant_type": "password",
                "username": email,
                "password": password,
                "client_id": `${myClient}`
            }),
        },(error,response, body)=>{
            console.log("body",body)
            // console.log("response",response)
            // console.log("error",error)
        })

        // console.log("data login", data)
    } catch (error) {
        next(error)
    }
})



app.listen(4000, () => {
    console.log("Server is running!");
})
