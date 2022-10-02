import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.${process.env.NODE_ENV}.env`,

  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'local'),
    DATABASE_URL: Joi.string().required(),
  }),
});
