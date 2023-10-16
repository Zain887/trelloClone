import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

configDotenv()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/src/migrations/*.js"],
  // logging: true,  
  // autoLoadEntities: true,
  
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;






















// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv'; // dotenv library for loading .env file

// dotenv.config(); // Load .env file

// const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST, // Use environment variables
//   port: parseInt(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   // autoLoadEntities: true,
  
// };

// export default typeOrmConfig;
