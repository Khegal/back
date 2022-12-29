import { config } from 'dotenv';

config();
export default () => {
  return {
    security: {
      secret: process.env.APP_SECRET || '',
    },
    port: parseInt(process.env.PORT, 10) || 3306,
    database: {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  };
};

export const microservices = {
  auth: {
    baseURL: 'https://elf-authentication-system.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      system_id: 'sp13',
    },
  },
  td_spirits: {
    baseURL: 'https://tiny-learn-service.herokuapp.com/v1',
    headers: {
      'Content-Type': 'application/json',
      system_id: 'sp13',
    },
  },
};
