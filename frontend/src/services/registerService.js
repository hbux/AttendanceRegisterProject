import axios from 'axios'

// Class for sending register related requests to the API
class RegisterService {
    apiUrl = 'http://localhost:3000/register/';
    
    // Tutors can send an activate register request
    async activateRegisterAsync(data) {
        // Ensure the user is logged in so we can set the access token in the authorization header
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'activate';

        // this put method is async so await it to receive the response
        let response = await axios.put(urlTarget, data);

        return response;
    }

    // Tutors can retrieve all registers from the database. NOTE: this only retrieves regiters where the user is the tutor of a register
    async getRegistersAsync() {
        // Ensure the user is logged in so we can set the access token in the authorization header
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'get/all';

        // this get method is async so await it to receive the response
        let response = await axios.get(urlTarget);

        return response;
    }

    // Tutors can view cohort attendance of a specific register. NOTE: this only a reigster is the user is a tutor/module leader of the register
    async viewCohortAttendanceAsync(id) {
        // Ensure the user is logged in so we can set the access token in the authorization header
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
        }

        let urlTarget = this.apiUrl + 'get/' + id;

        // this get method is async so await it to receive the response
        let response = await axios.get(urlTarget);

        return response;
    }
}

export default new RegisterService();