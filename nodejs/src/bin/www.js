// official
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// non-official
import * as advice from './common/advice.js';
import * as home from '../routes/home/index.js';
import * as todo from '../routes/todo/todo.js';

// variable
const PORT = 4001;
const app = express();

export default class Server {
  constructor() {
    console.log('Server setting start...');

    dotenv.config();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(advice.allAround);
    app.use('/', todo.router);

    console.log('Server setting end...');
  }

  start() {
    console.log(`server start port: ${PORT}`);
    return app.listen(PORT);
  }
}
