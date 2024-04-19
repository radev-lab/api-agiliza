import {
  Inject,
  Injectable,
  TransportOptions,
  Transporter,
  createTransport,
  forwardRef,
} from '~/libs';
import { EnvironmentService } from '~/modules';
import { PORT } from '~/utils';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(
    @Inject(forwardRef(() => EnvironmentService))
    private environmentService: EnvironmentService,
  ) {
    const port = Number(this.environmentService.getPortEmail());

    const transporterOptions: TransportOptions = {
      host: this.environmentService.getHostEmail(),
      port: port,
      secure: port === PORT.SECURE_PORT_EMAIL ? true : false,
      auth: {
        user: this.environmentService.getUserEmail(),
        pass: this.environmentService.getPasswordEmail(),
      },
    };

    this.transporter = createTransport(transporterOptions);
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: this.environmentService.getUserEmail(),
      to,
      subject,
      text,
    };

    if (!to) return;

    await this.transporter.sendMail(mailOptions);
  }
}
