import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { SESClientConfig } from '@aws-sdk/client-ses';

import type { Configuration } from '../../configuration/index.js';

export class SimpleEmailService {
  private static _instance: SimpleEmailService | null = null;
  private _sesClient: SESClient;
  private verifiedIdentity: string;

  private constructor(readonly config: Configuration) {
    this.verifiedIdentity = config.aws.ses.verifiedIdentity;

    const clientOptions: SESClientConfig = {
      credentials: {
        secretAccessKey: config.aws.accessSecret,
        accessKeyId: config.aws.accessKey,
      },
      region: config.aws.region,
      endpoint: config.aws.ses.endpoint,
    };

    this._sesClient = new SESClient(clientOptions);
  }

  public static getInstance(config: Configuration): SimpleEmailService {
    if (!this._instance) this._instance = new SimpleEmailService(config);

    return this._instance;
  }

  async sendEmail(emailList: string[], subject: string, templateData: string): Promise<void> {
    const command = new SendEmailCommand({
      Source: this.verifiedIdentity,
      Destination: { ToAddresses: emailList },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: templateData },
        },
      },
    });

    await this._sesClient.send(command);
  }
}

export default SimpleEmailService;
