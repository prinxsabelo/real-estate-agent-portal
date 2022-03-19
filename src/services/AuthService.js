import axios from 'axios';

const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
    Authorization: ``
}
function joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
}

class AuthService {
    constructor() {
        this.domain = "http://127.0.0.1:8000/api";

    }

    sendRequest = async (url, data = null) => {
        url = joinURL(this.domain, url);
        try {
            const result = await axios.get(url, data, {
                headers
            });
            return result.data;
        } catch (err) {
            console.log(err);
            alert('google woman');
        }
    }
}

export default AuthService;