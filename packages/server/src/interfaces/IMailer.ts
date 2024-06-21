export default interface IMailer {
  send(to: string | string[], subject: string, body: string): Promise<void>;
}
