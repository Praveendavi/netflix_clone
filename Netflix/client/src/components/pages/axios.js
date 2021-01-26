import axios from 'axios';

const intance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default intance