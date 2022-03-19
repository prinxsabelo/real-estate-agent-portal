import axios from 'axios';
import cookie from "js-cookie";

const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
    Authorization: ``
}
function joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
}


class HttpService {


    constructor(props) {
        this.domain = "http://127.0.0.1:8000/api";
    }


    post = async (url, data = null) => {

        const token = cookie.get("token");
        const agent_id = cookie.get("agent_id");
        if (token) {
            headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        if (!token) {
            localStorage.clear();
        }

        data.agent_id = agent_id;
        url = joinURL(this.domain, url);
        try {
            const result = await axios.post(url, data, {
                headers
            });
            return result.data;
        } catch (err) {
            console.log(err);
            alert('xx');
        }
    }
}

export default HttpService;