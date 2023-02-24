import jwt from 'jsonwebtoken';

export default class AuthService {
  public validateToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_KEY ?? 'USERVALIDATOR');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
