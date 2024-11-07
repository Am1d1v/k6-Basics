import http from 'k6/http';



// Positive case
// export default () => {
//     const res = http.get('https://test.k6.io');
//     console.log(res.status);

// };


// Unexisting url
export default () => {
    const res = http.get('https://test.k6.io/unexistingurl');
    console.log(res.status);
};

