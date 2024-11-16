import http from 'k6/http';
import { sleep } from 'k6';
import {randomString} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

 export const options = {
    vus: 10,
    duration: '3s'
}; 


export default () => {
    
    const credentials = {
        username: 'username_' + randomString(10),
        password: 'secret_' + randomString(15)
    };

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
};