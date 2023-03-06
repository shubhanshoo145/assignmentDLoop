import * as mongoose from 'mongoose';

export interface IMongooseService {
  openConnection(): Promise<void>;
}

export class MongooseService implements IMongooseService {
  public connection: mongoose.Connection;
  private connectionOptions: mongoose.ConnectOptions = {
    autoIndex: true,
    connectTimeoutMS: 180 * 1000,
    socketTimeoutMS: 180 * 1000,
    keepAlive: true,
    keepAliveInitialDelay: 10 * 1000,
  };

  public async openConnection(): Promise<void> {
    this.subscribeEvents();

    const instance = await mongoose.connect(
      process.env.DB_URL,
      this.connectionOptions,
    );
    this.connection = instance.connection;
  }

  private subscribeEvents(): void {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connection established');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection lost');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Mongoose connection reestablished');
    });

    mongoose.connection.on('error', (error) => {
      console.error('Mongoose connection error', {
        error,
      });
    });

    mongoose.connection.on('reconnectFailed', (error) => {
      console.error('Mongoose connection reestablishment failed', {
        error,
      });
    });
  }
}