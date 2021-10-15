'use strict';

// official
import express from 'express';

// non-official
import * as ctrl from './home.ctrl.js';

const router = express.Router();

router.get('/', ctrl.output.hello);

router.get('/test', ctrl.output.test);

export { router };
