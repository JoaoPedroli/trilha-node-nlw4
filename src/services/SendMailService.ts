import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    // lê o arquivo mandado
    const templateFileContent = fs.readFileSync(path).toString('utf8');

    const mailTemplateParams = handlebars.compile(templateFileContent);

    const html= mailTemplateParams(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html: html,
      from: 'NP5 <noreply@nps.com.br>'
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Peview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService();
