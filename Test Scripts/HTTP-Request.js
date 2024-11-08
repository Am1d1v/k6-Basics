import http from 'k6/http';
import {check, sleep} from 'k6'


export const options = {
    vus: 45,
    duration: '3s',
    thresholds: {
        http_req_duration: ['p(95) < 120'],
        http_req_failed: ['rate <= 0.01'],
        http_reqs: ['count > 10'],
    }
}

// Positive case
export default () => {
    const res = http.get('https://test.k6.io');

    check(res, {
        'response status code is 200': (response) => response.status === 200,
        'page is start page': (response) => response.body.includes('Collection of simple web-pages suitable for load testing.')
    });

    //sleep(1);
};


// Unexisting url
/* export default () => {
    const res = http.get('https://test.k6.io/unexistingurl');
    console.log(res.status);
}; */
