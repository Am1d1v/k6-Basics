import http from 'k6/http'
import { check } from 'k6';


export const options = {
    stages: [
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '20s',
            target: 10
        },
        {
            duration: '10s',
            target: 0
        },
    ],
    cloud: {
        projectID: 3724672
    }
};

const body = JSON.stringify(
    {
        username: 'k6TestName123',
        password: 'k6TestPassword123'
    }
)

const params = {
    headers: {
        'Content-Type': 'application/json'
    }
}




// Token login
export default () => {

    let reg = http.post('https://test-api.k6.io/user/register/', body, params);

    const res = http.post('https://test-api.k6.io/auth/token/login/', body, params);

    let parsed = JSON.parse(res.body)

    // Access token
    const accessToken = parsed.access;

    const crocodileData = {
        name: "New Crocodile",
        sex: 'M',
        date_of_birth: '1998-01-01'
    }

    const paramsWithToken = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }

     http.get(
        'https://test-api.k6.io/my/crocodiles/', 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }); 

    http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(crocodileData),
        paramsWithToken
    ); 
    
};