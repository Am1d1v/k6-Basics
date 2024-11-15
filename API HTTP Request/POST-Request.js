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

    /*  http.get(
        'https://test-api.k6.io/my/crocodiles/', 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }); */

   /*  http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(crocodileData),
        paramsWithToken
        ); */
        
    const arrayOfCreatedItem = http.get(`https://test-api.k6.io/my/crocodiles/`, 
        {headers: {
            'Authorization': `Bearer ${accessToken}`
        }}
        );

    const lastCreatedItem = JSON.parse(arrayOfCreatedItem.body).pop();    

    const getLastItem = http.get(`https://test-api.k6.io/my/crocodiles/${lastCreatedItem.id}/`, 
        {headers: {
            'Authorization': `Bearer ${accessToken}`
        }}
        );  

    check(getLastItem, {
        'Status is 200': res => res.status === 200,
        'correct id"': res => res.json().id == lastCreatedItem.id
    });

    // Update last created item PUT request
    /*  http.put(
        `https://test-api.k6.io/my/crocodiles/${lastCreatedItem.id}/`,
        JSON.stringify({
            name: "Crocodile Updated",
            sex: "M",
            date_of_birth: '1998-03-03'
        }),
        paramsWithToken
        ); */

    // Update last created item PATCH request
     http.patch(
        `https://test-api.k6.io/my/crocodiles/${lastCreatedItem.id}/`,
        JSON.stringify({
            name: "Crocodile Updated PATCH",
            date_of_birth: '1000-03-03'
        }),
        paramsWithToken
        );
};