import axios from 'axios'

class AttendanceService {
    apiUrl = 'http://localhost:3000/attendance/';
    
    async registerCodeAsync(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'register';

        let response = await axios.post(urlTarget, data);

        return response;
    }
    
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

        let urlTarget = this.apiUrl + 'registers/all';

        let response = await axios.get(urlTarget);

        return response;
    }

    async getRegisterAsync(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'registers/' + id;

        let response = await axios.get(urlTarget);

        return response;
    }
}

export default new AttendanceService();