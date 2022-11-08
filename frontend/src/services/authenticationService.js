import axios from 'axios'

class AuthenticationService {
    apiUrl = 'http://localhost:3000/user/';
    
    async loginAsync(data) {
        let urlTarget = this.apiUrl + 'login';

        let response = await axios.post(urlTarget, data);

        return response;
    }
    async registerAsync(data) {
        let urlTarget = this.apiUrl + 'register';

        let response = await axios.post(urlTarget, data);

        return response;
    }
    async addRoleAsync(data) {
        let urlTarget = this.apiUrl + 'role/add';

        let response = await axios.post(urlTarget, data);

        return response;
    }
}

export default new AuthenticationService();