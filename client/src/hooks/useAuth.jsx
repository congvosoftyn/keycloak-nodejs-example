import React, { useEffect, useState, useRef } from 'react'
import Keycloak from 'keycloak-js';

function useAuth() {
    const isRun = useRef(false);
    const [isLogin, setIsLogin] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const client = new Keycloak({
            // url: `${import.meta.env.VITE_KEYCLOAK_URL}`,
            url: "http://localhost:8088",
            realm: "myrealm",
            clientId: "myclient"
        })

        if (isRun.current) return;

        isRun.current = true;

        client.init({ onLoad: "login-required" }).then((res) => {
            setIsLogin(res)
            // console.log("res", client.idToken)
            setToken(client.token)
        })

    }, [])


    return {isLogin,token}
}

export default useAuth