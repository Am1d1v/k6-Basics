import http from 'k6/http';
import {sleep, check, group} from 'k6';


export const options = {
    thresholds: {
        'group_duration{group:::Main page}': ['p(95) < 900'],
        'group_duration{group:::Main page::Assets}': ['p(95) < 300'],
        'group_duration{group:::News page}': ['p(95) < 600'],
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
    group('News page', () => {
        http.get('https://test.k6.io/news.php');
    });
    
    sleep(1);
};