import http from 'k6/http'
import { check } from 'k6';


export const options = {

};

export default () => {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    console.log(crocodiles[0].name);

    const crocodileID = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}`);

    check(res, {
        'status is 200': response => response.status === 200,
        'Name is Bert': response => response.json().name === 'Bert',
        'Id is equal 1': response => response.json().id = crocodileID
    });
};