import { EntitySchema } from 'typeorm';

export interface AccountSchemaProps {
  uid: string;
  email_address: string;
  username: string;
  password: string;
  created_at: string;
}

export const AccountSchema: EntitySchema<AccountSchemaProps> =
  new EntitySchema<AccountSchemaProps>({
    name: 'account',
    columns: {
      uid: {
        type: 'varchar',
        length: 40,
        primary: true,
      },
      email_address: {
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
      },
      username: {
        type: 'varchar',
        length: 64,
        nullable: false,
      },
      password: {
        type: 'varchar',
        length: 255,
        nullable: false,
      },
      created_at: {
        type: 'date',
        nullable: false,
      },
    },
  });
