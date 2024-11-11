import http from 'k6/http';
import {sleep, check, group} from 'k6';


export const options = {
    vus: 3,
    duration: '3s'
};

console.log('Init Stage');

export function setup(){
    console.log('Setup Stage');
};

export default () => {
    console.log('VU Stage');
};

export function teardown(){
    console.log('Teardown stage');
}