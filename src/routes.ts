import { Router } from 'express';

// controllers
import SurveyController from './controllers/SurveyController';
import UserController from './controllers/UserController';

const router = Router();

router.post('/users', UserController.create);

router.post('/surveys', SurveyController.create);
router.get('/surveys', SurveyController.index);

export { router };
