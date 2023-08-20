import axios from 'axios';
import baseUrl from '../baseUrl';

console.log('REAL LOGIN CLIENT');

export default axios.create({baseURL: baseUrl});
