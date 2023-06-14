import axios, { AxiosInstance } from 'axios';

const clienteHttp: AxiosInstance = axios.create({
    //baseURL: "http://localhost:3000/"
    baseURL:'https://my-json-server.typicode.com/luanayasmim/alura-tracker/'
});

export default clienteHttp;