declare module 'nodemailer' {
  export function createTransport(options: any): {
    verify(): Promise<boolean>;
    sendMail(options: any): Promise<any>;
  };
}
