//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 *
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>, ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from 'fs-extra';
import fastify from 'fastify';

const data = {
  error: false,
  users: [
    'John Doe',
    'Lucita Esau',
    'Thomas Friedman',
    'Norma Helms',
    'Amy Manning',
  ],
};

async function saveData() {
  await fs.writeJson('data.json', data);
}

const app = fastify({
  ignoreTrailingSlash: true,
  keepAliveTimeout: 65 * 1000,
});

app.get('/', async (request, reply) => {
  reply.header('Content-Type', 'text/html; charset=utf-8');

  try {
    const jsonData = await fs.readJson('data.json');
    const usersList = jsonData.users.map((user) => `<p>${user}</p>`).join('');

    const page = `<html>
            <head>
                <title>Wallethub Test</title>
            </head>
            <body>
            ${usersList}
            </body>
        </html>`;

    reply.send(page);
  } catch (error) {
    reply
      .status(500)
      .send(`<html><body><p>Error reading data: ${error}</p></body></html>`);
  }
});

app.listen(8080, '0.0.0.0').then((address) => {
  console.log(`Server started at ${address}`);
  saveData().catch((err) => {
    console.error('Error saving data:', err);
  });
});
