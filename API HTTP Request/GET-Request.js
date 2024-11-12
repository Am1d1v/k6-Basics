import http from 'k6/http'
import { check } from 'k6';


export const options = {

};

export default () => {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    res = http.get('https://test-api.k6.io/public/crocodiles/1');

    check(res, {
        'status is 200': response => response.status === 200,
        'Name is Bert': response => response.body.includes('Bert')
    });
};