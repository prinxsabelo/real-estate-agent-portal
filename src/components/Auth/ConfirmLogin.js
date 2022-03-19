import React, { useCallback, useEffect } from "react";
import cookie from "js-cookie";
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from "../../services/AuthService";

const ConfirmLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const fetchApi = useCallback(async () => {
        localStorage.clear();
        cookie.remove("token");
        let url = "";
        if (window.location.pathname.search("google") !== -1) {
            url = `login/google/callback/${location.search}`
        } else {
            url = `login/facebook/callback/${location.search}`
        }

        const auth = new AuthService();
        auth.sendRequest(url).then(response => {
            // Cookie to save token..
            // Then localstorage to save user information..
            // Going to ('/') means going to Home.. 
            const { agent_id, email, name } = response.agent_user;
            const { token } = response;
            cookie.set("token", JSON.stringify(token));
            cookie.set('agent_id', JSON.stringify(agent_id));
            localStorage.setItem('agent_user', JSON.stringify({ agent_id, email, name }));
            setTimeout(() => {
                navigate('/');
            }, 1000)

        }).catch(error => {
            console.log(error);
        })
    }, [location.search, navigate]);

    useEffect(() => {
        fetchApi()
    }, [fetchApi])

    return (
        <div>ConfirmLogin</div>
    )
}

export default ConfirmLogin