// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Vaccine, Child, User, Blog, VaccineChild } = initSchema(schema);

export {
  Vaccine,
  Child,
  User,
  Blog,
  VaccineChild
};