import http from 'k6/http';
import { sleep } from 'k6';
import {randomString} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

 export const options = {
    vus: 10,
    duration: '15s'
}; 


export default () => {
    
    const randomUsername = randomString(10);
    const randomSecret = randomString(15);

    const credentials = {
        username: 'username_' + Date.now(),
        password: 'secret_' + Date.now()
    };

    http.post(
        'https://test-api.k6.io/user/register/',
        credentials
        );

};