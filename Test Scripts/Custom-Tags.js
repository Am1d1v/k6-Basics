import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';



export const options = {
    thresholds: {
        http_req_duration: ['p(95) < 300'],
        'http_req_duration{page: order}': ['p(95) < 2700'],
        https_errors: ['count === 0'],
        'https_errors{page: order}': ['count === 0'],
        checks: ['rate > 0.99'],
        'checks{page: order}': ['rate > 0.99'],
    }
};

let httpErrors = new Counter('https_errors');

export default () => {
    let response = http.get('https://run.mocky.io/v3/51396d9d-cdae-431d-94a4-ffd70c0a9ee5');
    
    // If error occures => increase counter by 1
    if(response.error){
        httpErrors.add(1);
    };

    check(response, {
        'status is 200': response => response.status === 200
    });

    // Submit order
    response = http.get('https://run.mocky.io/v3/7ea53017-8f09-4971-8705-f1c85e324f1d?mocky-delay=2000ms', {
        tags: {
            page: 'order'
        }
    });

    // If error occures => increase counter by 1
    if(!response.error){
        httpErrors.add(1, {
            page: 'order'
        });
    };

    check(response, 
        {
        'status is 201': response => response.status === 201
        }, 
        {
            page: 'order'
        });

    sleep(1);

};