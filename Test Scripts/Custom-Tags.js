import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';



export const options = {
    thresholds: {
        http_req_duration: ['p(95) < 300']
    }
};

let httpErrors = new Counter('https_errors');

export default () => {
    http.get('https://run.mocky.io/v3/51396d9d-cdae-431d-94a4-ffd70c0a9ee5');
    http.get('https://run.mocky.io/v3/7ea53017-8f09-4971-8705-f1c85e324f1d');
    //http.get('https://run.mocky.io/v3/7ea53017-8f09-4971-8705-f1c85e324f1d?mocky-delay=2000ms');
};