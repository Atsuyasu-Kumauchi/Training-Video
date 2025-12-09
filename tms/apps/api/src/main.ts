import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties not defined in DTOs
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
    transform: true, // Transform payloads to DTO instances
  }));
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📊 Database: ${process.env.DATABASE_NAME} on ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`);
}
bootstrap();
