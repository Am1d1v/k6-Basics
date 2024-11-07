import http from 'k6/http';
import {check} from 'k6'


// Positive case
export default () => {
    const res = http.get('https://test.k6.io');
    check(res, {
        'response status code is 200': (response) => response.status === 200
    });
};


// Unexisting url
/* export default () => {
    const res = http.get('https://test.k6.io/unexistingurl');
    console.log(res.status);
}; */

