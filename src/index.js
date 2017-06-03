import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes';


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/q2-contact-list/');


const PORT = 3000;
const app = express();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('MondgoDB connected');
});


app.use(bodyParser.json());
app.use(UserRoutes);


app.use((request, response, next) => {
  console.log('Middleware executed');
  next();
});
// eslint-disable-next-line
app.use((err, request, response, next) => {
  console.log('Error Middleware', err);
  return response.status(500).json({message: err.message});
});


app.get('/', (request, response) => {
  console.log('route was called');
  return response.json([
    {
      id: 1,
      name: 'wurst'
    }
  ]);
});

app.get('/err', (request, response, next) => {
  console.log('ERR route was called');
  return next(new Error('Error is thrown'));
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
