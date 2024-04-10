import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set, disconnect } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 8080;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    set('strictQuery', false);

    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url)
      .then(() => console.log('DB connected'))
      .catch(err => console.error(err));
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream })); // log all requests to the console
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS })); // enable cors with origin
    this.app.use(hpp()); //additional security, prevent http parameter pollution
    this.app.use(helmet()); //additional security, set various HTTP headers
    this.app.use(compression()); //compress all responses
    this.app.use(express.json()); //parse incoming requests with JSON payloads
    this.app.use(express.urlencoded({ extended: true })); //parse incoming requests with urlencoded payloads
    this.app.use(cookieParser()); //parse incoming cookie headers
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        swagger: '2.0',
        info: {
          title: 'REST API',
          version: '0.1.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); //run swagger API docs on /api-docs
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
