import axios from 'axios'

class RegisterService {
    apiUrl = 'http://localhost:3000/register/';
    
    async activateRegisterAsync(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'activate';

        let response = await axios.put(urlTarget, data);

        return response;
    }

    async getRegistersAsync() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'get/all';

        let response = await axios.get(urlTarget);

        return response;
    }

    async getRegisterAsync(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'get/' + id;

        let response = await axios.get(urlTarget);

        return response;
    }
}

export default new RegisterService();