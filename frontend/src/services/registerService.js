import axios from 'axios'

const user = JSON.parse(localStorage.getItem('user'));

class RegisterService {
    apiUrl = 'http://localhost:3000/register/';
    
    async registerCodeAsync(data) {
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let response = await axios.post(this.apiUrl, data);

        return response;
    }
    
    async activateRegisterAsync(data) {
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'activate';

        let response = await axios.post(urlTarget, data);

        return response;
    }
}

export default new RegisterService();