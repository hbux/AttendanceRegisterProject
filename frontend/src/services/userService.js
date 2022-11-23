import axios from 'axios'

class UserService {
    apiUrl = 'http://localhost:3000/user/';

    async loginAsync(data) {
        let urlTarget = this.apiUrl + 'login';

        let response = await axios.post(urlTarget, data);

        return response;
    }

    async registerAsync(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }
        
        let urlTarget = this.apiUrl + 'register';

        let response = await axios.post(urlTarget, data);

        return response;
    }

    async getAllAsync() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let response = await axios.get(this.apiUrl);

        return response;
    }

    async updateUser(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let response = await axios.put(this.apiUrl, data);

        return response;
    }

    async deleteUser(data) {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + data.id;

        let response = await axios.delete(urlTarget);

        return response;
    }
}

export default new UserService();