import { type ServiceAccount } from 'firebase-admin/app';

import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
} from 'app/configs/constants';

export const firebase_service_account_config: ServiceAccount = {
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY,
  projectId: FIREBASE_PROJECT_ID,
};
