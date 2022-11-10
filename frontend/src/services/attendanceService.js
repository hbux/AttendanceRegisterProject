import axios from 'axios'

class AttendanceService {
    apiUrl = 'http://localhost:3000/attendance/';
    
    async registerCodeAsync(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let response = await axios.post(this.apiUrl, data);

        return response;
    }

    async editStudentAttendanceAsync(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let response = await axios.put(this.apiUrl, data);

        return response;
    }
}

export default new AttendanceService();