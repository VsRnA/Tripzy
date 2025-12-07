import * as dotenv from 'dotenv';
import { Env } from '#Lib/env/env';
import { schema } from '#Lib/env/schema';

dotenv.config({ path: '.env' });

export const env = new Env(schema, process.env);
