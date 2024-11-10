import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';



export const options = {
    thresholds: {
        http_req_duration: ['p(95) < 300'],
        https_errors: ['count === 0']
    }
};

let httpErrors = new Counter('https_errors');

export default () => {
    let response = http.get('https://run.mocky.io/v3/51396d9d-cdae-431d-94a4-ffd70c0a9ee5');
    
    if(response.error){
        httpErrors.add(1);
    }

    check(response, {
        'status is 200': response => response.status === 200
    })
};