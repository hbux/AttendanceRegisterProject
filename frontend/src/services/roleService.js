import axios from 'axios'

// Class for sending role related requests to the API
class RoleService {
    apiUrl = 'http://localhost:3000/role/';

    // This retrieves all roles from the database using a get request 
    async getAllAsync() {
        // await the response
        let response = await axios.get(this.apiUrl);

        return response;
    }
}

export default new RoleService();