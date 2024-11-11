import http from 'k6/http';
import {sleep, check, group} from 'k6';


export const options = {
    thresholds: {
        http_req_duration: ['p(95) < 1000'],
        'http_req_duration{expected_response:true}': ['p(95) < 1000'],
        'group_duration{group:::Main page}': ['p(95) < 8000'],
        'group_duration{group:::Main page::Assets}': ['p(95) < 3000'],
        'group_duration{group:::News page}': ['p(95) < 6000'],
    }
};

export default () => {

    // Main page group organizing
    group('Main page', () => {

        let res = http.get('https://run.mocky.io/v3/8643b388-eded-4cce-9007-98468036bd28?mocky-delay=900ms');

        check(res, {
            'status is 200': response => response.status === 200
        });

        group('Assets', () => {
            http.get('https://run.mocky.io/v3/8643b388-eded-4cce-9007-98468036bd28?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/8643b388-eded-4cce-9007-98468036bd28?mocky-delay=900ms');
        });
        
    });

    // News page group organizing
    group('News page', () => {
        http.get('https://run.mocky.io/v3/201f027a-3a03-40ec-a86a-3bc87978a842');
    });
    
    sleep(1);
};