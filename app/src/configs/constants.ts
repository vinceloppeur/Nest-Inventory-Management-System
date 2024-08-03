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

export const FIREBASE_CLIENT_EMAIL: string = env
  .get('FIREBASE_CLIENT_EMAIL')
  .required()
  .asString();

export const FIREBASE_PRIVATE_KEY = env
  .get('FIREBASE_PRIVATE_KEY')
  .required()
  .asString();

export const FIREBASE_PROJECT_ID = env
  .get('FIREBASE_PROJECT_ID')
  .required()
  .asString();
