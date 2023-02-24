import jwt from 'jsonwebtoken';
import moment from 'moment';
import MailerRepository from '../repositories/mailer.repository';
import UserRepository from '../repositories/user.repository';
import { IFilter } from '../types/filter';
import { IUser } from '../types/users';

export default class UserService {
  userRepository: UserRepository;
  mailerRepository: MailerRepository;

  constructor(userRepository: UserRepository, mailerRepository: MailerRepository) {
    this.userRepository = userRepository;
    this.mailerRepository = mailerRepository;
  }

  // GET ALL USERS WHO HAVE VALIDATED THEIR EMAIL
  public async getValidatedUsers(filter: IFilter): Promise<IUser[]> {
    if (!filter.start_date) throw new Error('Debe ingresar la fecha de inicio');
    if (!filter.end_date) throw new Error('Debe ingresar la fecha fin');

    const formatedFilter = this.formatFilter(filter);

    let users = await this.userRepository.getValidatedUsers(formatedFilter);
    users = users.map((user: IUser) => {
      user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');
      user.create_date = moment(user.create_date).format('YYYY-MM-DD HH:mm');
      return user;
    });
    return users;
  }

  // SAVE USER INFO INTO DATABASE AND SEND THE VALIDATION CODE MAIL
  public async saveUser(user: IUser): Promise<void> {
    const newUser = this.formatUser(user);
    await this.userRepository.saveUser(newUser);
    this.sendValidationCodeMail(newUser);
  }

  // VERIFY CODE, SEND THE USER INFO MAIL AND UODATE THE MAIL STATUS
  public async validateUserCode(code: string): Promise<IUser> {
    if (!code) throw new Error('Debe ingresar un código');

    const user = await this.userRepository.getUserByCode(code);
    if (!user) throw new Error('El código ingresado no es válido');

    this.userRepository.updateMailStatus(user.id);
    this.sendUserInfoMail(user);

    return user;
  }

  private formatFilter(filter: IFilter): IFilter {
    filter.start_date = moment(filter.start_date).format('YYYY-MM-DD');
    filter.end_date = moment(filter.end_date).format('YYYY-MM-DD');
    return filter;
  }

  // GET USER FULL BITHDATE AND GENERATE THE VALIDATION CODE
  private formatUser(user: IUser): IUser {
    if (!user.name) throw new Error('No se envió el nombre');
    if (!user.email) throw new Error('No se envió el correo');
    if (!user.age) throw new Error('No se envió la edad');
    if (!user.birthdate) throw new Error('No se envió la fecha de nacimiento');

    const birthdate = moment(user.birthdate, 'DD/MM') > moment() ? moment(user.birthdate, 'DD/MM').subtract(user.age + 1, 'years') : moment(user.birthdate, 'DD/MM').subtract(user.age, 'years');
    user.birthdate = birthdate.format('YYYY-MM-DD');
    user.validation_code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return user;
  }

  // SEND THE VALIDATION CODE TO THE USER
  private sendValidationCodeMail(user: IUser): void {
    const text = `Hola ${user.name} \nEl código de validación es ${user.validation_code}`;
    this.mailerRepository.sendMail(user.email, 'Validación de correo', text);
  }

  // SEND THE USER INFO MAIL TO BUSSINES MAIL
  private sendUserInfoMail(user: IUser): void {
    user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');
    const text = `Nueva información registrada: \nNombre: ${user.name} \nCorreo: ${user.email} \nEdad:${user.age} \nFecha nacimiento: ${user.birthdate}`;
    this.mailerRepository.sendMail(process.env.BUSSINES_MAIL ?? user.email, 'Confirmación de información', text);
  }

  public generateToken(): string {
    return jwt.sign({}, process.env.JWT_KEY ?? 'USERVALIDATOR', { expiresIn: '1d' }).toString();
  }
}
