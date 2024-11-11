import http from 'k6/http';
import {sleep, check, group} from 'k6';


export const options = {
    thresholds: {

    }
};

export default () => {

    // Main page group organizing
    group('Main page', () => {

        let res = http.get('https://test.k6.io');

        check(res, {
            'status is 200': response => response.status === 200
        });

        group('Assets', () => {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
        
    });

    // News page group organizing
    group('Main page', () => {
        http.get('https://test.k6.io/news.php');
    });
    
    sleep(1);
};