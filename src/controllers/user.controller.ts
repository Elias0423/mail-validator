import { Request, Response } from 'express';
import UserService from '../services/user.service';
import ResponseDto from '../types/responseDto';
import Controller from './controller';

export default class UserController extends Controller {
  userService: UserService;
  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  // GET ACCESS TOKEN
  loginUser = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const token = this.userService.generateToken();
      response = this.customResponse(200, 'Token de acceso', token);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  getValidatedUsers = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const filter: any = req.query;
      const users = await this.userService.getValidatedUsers(filter);
      response = this.customResponse(200, 'Usuarios filtrados', users);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  saveUser = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      await this.userService.saveUser(req.body);
      response = this.customResponse(201, 'Usuario guardado exitosamente', null);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  // VALIDATE THE USER CODE
  validateCode = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const user = await this.userService.validateUserCode(req.body.code);
      response = this.customResponse(200, 'Correo validado exitosamente', user);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };
}
