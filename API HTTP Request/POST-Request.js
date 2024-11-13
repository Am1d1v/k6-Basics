import http from 'k6/http'
import { check } from 'k6';


export const options = {

};

const body = JSON.stringify(
    {
        username: 'k6TestName1',
        password: 'k6TestPassword1'
    },
)

const params = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export default () => {
    http.post('https://test-api.k6.io/user/register/', body, params);
};