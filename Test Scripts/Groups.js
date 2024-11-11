import http from 'k6/http';
import {sleep, check} from 'k6';


export const options = {
    thresholds: {

    }
};

export default () => {
    let res = http.get('https://test.k6.io');

    check(res, {
        'ststus is 200': response => response.status === 200
    })

    sleep(1);
};