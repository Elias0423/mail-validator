import { Router } from 'express';
import UserController from '../controllers/user.controller';
import MailerRepository from '../repositories/mailer.repository';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.service';

const userRepository = new UserRepository();
const mailerRepository = new MailerRepository();
const userService = new UserService(userRepository, mailerRepository);
const userController = new UserController(userService);

const router = Router();

router.get('/validated/', userController.getValidatedUsers());
router.post('/', userController.saveUser());
router.post('/login/', userController.loginUser());
router.post('/validate/mail/', userController.validateCode());

export default router;
