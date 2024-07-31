import * as env from 'env-var';

export const DATABASE_HOST: string = env
  .get('DATABASE_HOST')
  .required()
  .asString();

export const DATABASE_USER: string = env
  .get('DATABASE_USER')
  .required()
  .asString();

export const DATABASE_DB: string = env.get('DATABASE_DB').required().asString();

export const DATABASE_PORT: number = env
  .get('DATABASE_PORT')
  .required()
  .default(5432)
  .asPortNumber();

export const DATABASE_PASSWORD: string = env
  .get('DATABASE_PASSWORD')
  .required()
  .asString();

export const JWT_SECRET: string = env.get('JWT_SECRET').required().asString();
