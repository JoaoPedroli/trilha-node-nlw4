import { Router } from 'express';

// controllers
import SurveyController from './controllers/SurveyController';
import UserController from './controllers/UserController';
import SendMailController from './controllers/SendMailController';
import AnswerController from './controllers/AnswerController';
import { ResourceTypes } from 'kafkajs';
import NpsController from './controllers/NpsController';

const router = Router();

router.post('/users', UserController.create);

router.post('/surveys', SurveyController.create);
router.get('/surveys', SurveyController.index);

router.post('/sendMail', SendMailController.execute);

router.get('/answers/:value', AnswerController.execute);

router.get('/nps/:survey_id', NpsController.execute);

export { router };
