'use strict';

// official
import express from 'express';

// non-official
import * as ctrl from './todo.ctrl.js';

const router = express.Router();

router.get('/todo', ctrl.output.select);
router.post('/todo', ctrl.output.insert);
router.put('/todo', ctrl.output.update);
router.delete('/todo', ctrl.output.delete);

export { router };
