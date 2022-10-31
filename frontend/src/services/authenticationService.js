import axios from 'axios'

class AuthenticationService {
    apiUrl = 'http://localhost:3000/authentication/';
    

    async loginAsync(data) {
        let urlTarget = this.apiUrl + 'login'

        let response = await axios.post(urlTarget, data);

        return response;
    }
}

export default new AuthenticationService();