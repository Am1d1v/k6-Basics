import http from 'k6/http'
import { check } from 'k6';


export const options = {

};

const body = JSON.stringify(
    {
        username: 'k6TestName1',
        password: 'k6TestPassword1'
    }
)

const params = {
    headers: {
        'Content-Type': 'application/json'
    }
}

// User register
/* export default () => {
    http.post('https://test-api.k6.io/user/register/', body, params);
}; */

// Token login
export default () => {
    const res = http.post('https://test-api.k6.io/auth/token/login/', body, params);

    const parsed = JSON.parse(res.body)

    // Access token
    const accessToken = parsed.access;

    http.get(
        'https://test-api.k6.io/my/crocodiles/', 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
};