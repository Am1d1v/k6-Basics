import http from 'k6/http';
import { sleep } from 'k6';
import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    vus: 10,
    duration: '5s'
};

export default () => {
    http.get('https://test.k6.io');

    console.log('- VU STAGE -');
    sleep(randomIntBetween(1, 5));
};