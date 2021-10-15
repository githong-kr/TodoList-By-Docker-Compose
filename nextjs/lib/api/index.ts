import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://node:4001',
});

export default axios;
