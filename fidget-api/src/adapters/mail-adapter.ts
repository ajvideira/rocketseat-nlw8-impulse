type MailAdapterData = {
  subject: string;
  body: string;
};

export interface MailAdapter {
  sendMail: (data: MailAdapterData) => Promise<void>;
}
