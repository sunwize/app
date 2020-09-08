import axios from 'axios';

export default class Network {

    static get(url) {
        return axios.get(`${process.env.VUE_APP_API_URL}/api${url}`);
    }

}
