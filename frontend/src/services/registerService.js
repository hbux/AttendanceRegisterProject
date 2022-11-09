import axios from 'axios'

const user = JSON.parse(localStorage.getItem('user'));

class RegisterService {
    apiUrl = 'http://localhost:3000/register/';
    
    async checkinCodeAsync(data) {
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'code';

        let response = await axios.post(urlTarget, data);

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

    async getRegistersAsync() {
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'getall';

        let response = await axios.get(urlTarget);

        return response;
    }
}

export default new RegisterService();