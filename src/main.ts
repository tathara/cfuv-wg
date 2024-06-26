import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => console.log(`API was created on port ${PORT}`));
}
bootstrap();
