import http from 'k6/http'
import { check } from 'k6';


export const options = {

};

export default () => {
    http.post('https://test-api.k6.io/user/register/', {
        username: 'k6TestName',
        password: 'k6TestPassword'
    });
};