import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({
  path: '.env',
});

const config = {
  type: 'postgres',
  //host: process.env.DB_HOST,
  //host: 'postgresdb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: false, // ayuda a sincronizar con la base de datos
  dropSchema: false,
};
console.log('DB_HOST:', process.env.DB_HOST);

export const typeOrmConfig = registerAs('typeorm', () => config); // registra en la configuracion de nest este objeto de'config'
export const connectionSource = new DataSource(config as DataSourceOptions); // configura de parte de typeorm este objeto de config y le da el nombre de DataSourceOptions para toda la app
