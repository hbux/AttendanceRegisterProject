import axios from 'axios'

class RoleService {
    apiUrl = 'http://localhost:3000/role/';

    async getAllAsync() {
        let response = await axios.get(this.apiUrl);

        return response;
    }
}

export default new RoleService();