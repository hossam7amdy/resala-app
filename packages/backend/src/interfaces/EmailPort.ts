export interface EmailPort {
  /**
   * Sends an email.
   * @param to - The list of email addresses to send the email to.
   * @param subject - The subject of the email.
   * @param body - The body content of the email.
   * @returns A promise that resolves when the email is sent.
   */
  sendEmail(to: string[], subject: string, body: string): Promise<void>;
}
