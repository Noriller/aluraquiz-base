import DBGenerator from '../../src/DBGenerator';

export default function dbHandler ( request, response ) {
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  const db = DBGenerator();

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  response.json(db);
}
