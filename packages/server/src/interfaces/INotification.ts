export default interface INotification {
  send(to: string | string[], subject: string, body: string): Promise<void>;
}
