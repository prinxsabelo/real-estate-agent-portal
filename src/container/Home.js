import React, { useEffect, useState } from 'react'
import HttpService from '../services/HttpService'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [me, setMe] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        const http = new HttpService();
        const agent_user = localStorage.getItem('agent_user') !== 'undefined' ? JSON.parse(localStorage.getItem('agent_user')) : localStorage.clear();
        if (!agent_user) navigate('/login');

        let url = "me";
        let data = {};
        http.post(url, data).then(response => {
            if (response && response.agent) {
                setMe(response);
                const { agent } = response;
                Object.keys(agent).forEach(a => {

                    if (agent[a] === "x") {
                        setTimeout(() => {
                            navigate('/agency-profile');
                        }, 2000)
                    }
                })
            }

        })


    }, [navigate]);


    return (
        <div>
            {me && <div>Good to go..</div>}
            xxx


        </div>


    )

}

export default Home