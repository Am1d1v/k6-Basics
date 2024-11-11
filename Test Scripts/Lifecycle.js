import http from 'k6/http';
import {sleep, check, group} from 'k6';


export const options = {
    vus: 3,
    duration: '3s'
};

console.log('Init Stage');

export default (data) => {
    console.log('VU Stage');
    sleep(1);
    console.log(data);
};

export function setup(){
    console.log('Setup Stage');
    sleep(10);
    const data = {value: 'somevalue'};

    return data;
};

export function teardown(data){
    console.log('Teardown stage');
    console.log(data.value += ' teardown');
}