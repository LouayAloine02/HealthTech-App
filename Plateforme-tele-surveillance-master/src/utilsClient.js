/* eslint-disable prettier/prettier */
import axios from "axios";

const client = axios.create({
    baseURL: 'http://192.168.100.198:5000/api'
})
export default client;