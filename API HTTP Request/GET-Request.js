import http from 'k6/http'

export const options = {

};

export default () => {
    const res = http.get('https://test-api.k6.io/public/crocodiles/');
    console.log(res);
};