import express from 'express';
import cors from 'cors';
import router from './routes/router';

class Index {
  private readonly app: express.Application;
  private readonly port: number;

  constructor() {
    this.port = Number(process.env.PORT ?? 3000);
    this.app = express();
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    this.app.use(cors());

    this.app.use(router);

    this.start(() => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  start(callback: any): void {
    this.app.listen(this.port, callback);
  }
}
export default new Index();
