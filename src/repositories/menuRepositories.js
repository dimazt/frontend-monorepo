import axios from 'axios';

const BASE_URL = '/api';

class MenuService {
    async list() {
        try {
            const response = await axios.get(`${BASE_URL}/menus`);
            return [response.data, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/menus/${id}`);
            return [response.data, null];
        } catch (error) {
            return [null, error];
        }
    }
}

export const menuRepository = new MenuService();
export default MenuService;