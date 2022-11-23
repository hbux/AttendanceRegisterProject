import axios from 'axios'

// Class for sending attendance related requests to the API
class AttendanceService {
    apiUrl = 'http://localhost:3000/attendance/';
    
    // Students can send a register code request
    async registerCodeAsync(data) {
        // Ensure the user is logged in so we can set the access token in the authorization header
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        // this method is async so await it to receive the response
        let response = await axios.post(this.apiUrl, data);

        return response;
    }

    // Tutors can send an edit student attendance request
    async editStudentAttendanceAsync(data) {
        // Ensure the user is logged in so we can set the access token in the authorization header
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        // this method is async so await it to receive the response
        let response = await axios.put(this.apiUrl, data);

        return response;
    }
}

export default new AttendanceService();