import type { Configuration } from '@/configuration';
import type { EmailPort } from '@/interfaces';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { SESClientConfig } from '@aws-sdk/client-ses';

export class SESAdapter implements EmailPort {
  private _sesClient: SESClient;
  private verifiedIdentity: string;

  constructor(readonly config: Configuration) {
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

export default SESAdapter;
