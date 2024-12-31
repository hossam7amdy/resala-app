import { configuration } from '@/configuration';
import { shoppingService } from '@/features';
import { SESAdapter } from '@/infrastructure/email-provider';
import { db } from '@/lib/db';

import { EmailService, SMSService } from '../infrastructure/services';
import { createAuthService } from '../lib/auth';

const config = configuration();

const authService = createAuthService({
  config,
  prismaDb: db,
  emailService: new EmailService(new SESAdapter(config)),
  smsService: new SMSService(),
  shoppingService,
});

export const authHandler = authService.handler;
export const generateOpenAPISchema = async () => {
  const openapiDoc = await import('./openapi.json');
  return JSON.parse(JSON.stringify(openapiDoc));
};
