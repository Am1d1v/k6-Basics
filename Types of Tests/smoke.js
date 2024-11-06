import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '10s',
};


// Positive Case
// export default function(){
//     http.get('https://test.k6.io');
//     sleep(1);
//     http.get('https://test.k6.io/contacts.php');
//     sleep(2);
//     http.get('https://test.k6.io/news.php');
//     sleep(3);
// };


// Negative Cases

// Page doesn't exist
// export default function(){
//     http.get('https://test.k6.local');
//     sleep(1);
//     http.get('https://test.k6.io/contacts.php');
//     sleep(2);
//     http.get('https://test.k6.io/news.php');
//     sleep(3);
// };

// Wrong URL adress. 404 error
export default function(){
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(3);
};