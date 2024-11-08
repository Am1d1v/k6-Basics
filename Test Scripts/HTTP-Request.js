import http from 'k6/http';
import {check, sleep} from 'k6'
import exec from 'k6/execution'
import {Counter} from 'k6/metrics'


export const options = {
    vus: 45,
    duration: '3s',
    thresholds: {
        http_req_duration: ['p(95) < 120'],
        http_req_duration: ['max < 1200'],
        http_req_failed: ['rate <= 0.01'],
        http_reqs: ['count > 10'],
        http_reqs: ['rate > 300'],
        vus: ['value > 15'],
        checks: ['rate > 0.95'] 
    }
};

// Custom counter metric
let myCounter = new Counter('custom_counter');

// Positive case
export default () => {
    const res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest >= 90 ? 'foo' : ''));
    console.log();

    check(res, {
        'response status code is 200': (response) => response.status === 200,
        'page is start page': (response) => response.body.includes('Collection of simple web-pages suitable for load testing.')
    });

    myCounter.add(1)

    sleep(2);
};


// Unexisting url
/* export default () => {
    const res = http.get('https://test.k6.io/unexistingurl');
    console.log(res.status);
}; */

