//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-02.js
 *
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from 'https';

https
  .get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.hobbies && Array.isArray(parsedData.hobbies)) {
          const hobbies = parsedData.hobbies.join(', ');
          console.log(hobbies);
        } else {
          console.log('No hobbies found or incorrect format.');
        }
      } catch (e) {
        console.error('Failed to parse response:', e);
      }
    });
  })
  .on('error', (err) => {
    console.error('Error: ' + err.message);
  });
