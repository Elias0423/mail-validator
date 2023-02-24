import dbConnection from '../db/mysql';
import { IFilter } from '../types/filter';
import { IUser } from '../types/users';

export default class UserRepository {
  async saveUser(user: IUser): Promise<void> {
    const query = 'INSERT INTO users SET ?';
    await dbConnection.query(query, user);
  }

  async getValidatedUsers(filter: IFilter): Promise<IUser[]> {
    const query = `SELECT id,name,email,age,birthdate,create_date FROM validator.users where validated_mail = 1 and date_format(create_date, "%Y-%m-%d") between '${filter.start_date}' and '${filter.end_date}';`;
    const [result]: any[] = await dbConnection.query(query);
    return result;
  }

  async getUserByCode(validationCode: string): Promise<IUser> {
    const query = `SELECT id,name,email,age,birthdate from users where validation_code = '${validationCode}' and validated_mail = 0 LIMIT 1`;
    const [result] = await dbConnection.query(query);
    return result[0];
  }

  async updateMailStatus(userId: number): Promise<void> {
    const query = `UPDATE users SET validated_mail = 1 WHERE id = ${userId}`;
    await dbConnection.query(query);
  }
}
