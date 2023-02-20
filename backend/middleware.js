import jwtmod from 'jsonwebtoken'
import request from 'request';

const keycloakHost = 'localhost';
const keycloakPort = '8088';
const realmName = 'myrealm';

const URI = `http://${keycloakHost}:${keycloakPort}/realms/${realmName}/protocol/openid-connect/userinfo`;

export default async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    // const token = bearerHeader.replace('Bearer ', '');
    // if (!token) return res.sendStatus(401);
    // const key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

    // const decoded = jwtmod.verify(token, key, {
    //     algorithms: ["RS256"]
    // })

    // // console.log("decoded", decoded)
    // res.locals.email = decoded.email;
    // // res.locals = decoded;

    if (!bearerHeader) {
        return res.status(401).json({
            message: 'unauthorized!'
        })
    }

    request(URI, {
        method: "GET",
        headers: {
            Authorization: bearerHeader
        }
    }, (error, response, body) => {
        if (error) next(error);

        // console.log("response", response.body)
        // console.log("body", body)
        // const user = JSON.parse(body)
        // console.log("email", user.email)

        if (response.statusCode !== 200) {
            return res.status(401).json({
                error: `unauthorized`,
            });
        }
        else {
            const user = JSON.parse(body)
            res.locals = user;
            next();
        }
    })

    // next()
}