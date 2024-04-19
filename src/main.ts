import { AppModule } from './app.module';
import {
  DocumentBuilder,
  NestFactory,
  SwaggerModule,
  ValidationPipe,
} from './libs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const config = new DocumentBuilder()
    .setTitle('API AGILIZA | CerradoTech')
    .setDescription('API AGILIZA | CerradoTech')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.API_PORT, '0.0.0.0');
  console.log(`Iniciado na porta ${process.env.API_PORT}`);
}
bootstrap();
