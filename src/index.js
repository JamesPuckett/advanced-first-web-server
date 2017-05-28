// Your server code here...

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const PORT = 3001;

const users = [
  {
    id: 1, 
    name: 'wurst'
  }, 
  {
    id: 2, 
    name: 'ale'
  },
  {
    id: 3,
    name: 'Shnictzel'
  }
];

app.get('/', (request, response) => {
  console.log('route was called');
  return response.json([
    {
      id: 1,
      name: 'wurst'
    }
  ]);
});

app.get('/users', (request, response) => {
  return response.json(users);
});

app.post('/users', (request, response) => {
  console.log(request.body);
  const user = {
    id: users.length + 1,
    ...request.body
  };
  users.push(user);
  return response.json(user);
});

app.get('/users/:id', (request, response) => {
  const foundUser = users.find((user) => {
    return String(user.id) === request.params.id;
  });
  return response.json(foundUser || null);
});

app.delete('/users/:id', (request, response) => {
  const foundUser = users.find((user) => {
    return String(user.id) === request.params.id;
  });
  // delete user
  return response.json(foundUser || null);
});

app.get('/*', (request, response) => {
  return response.json({
    err: 'not implmented'
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  return console.log('listening on port ' + PORT);
});

//  app.all('/', (request, response) => {
//    return response.json({
//      hello: 'world'
//    });
//  });
