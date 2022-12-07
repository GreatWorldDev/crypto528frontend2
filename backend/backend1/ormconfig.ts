import { ConnectionOptions } from 'typeorm';
const env = process.env.NODE_ENV || 'development';

const dbConnection: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  logging: false,
  entities: [env === 'production' ? 'build/database/entities/*{.ts,.js}' : 'src/database/entities/*{.ts,.js}'],
  migrations: [env === 'production' ? 'build/database/migrations/*{.ts,.js}' : 'src/database/migrations/*{.ts,.js}'],
  subscribers: [env === 'production' ? 'build/database/subscribers/*{.ts,.js}' : 'src/database/subscribers/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};

export default dbConnection;
