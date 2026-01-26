import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties not defined in DTOs
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
    transform: true, // Transform payloads to DTO instances
  }));
  
  // Swagger API Documentation Setup (works without decorators - auto-discovers routes)
  const config = new DocumentBuilder()
    .setTitle('TMS API')
    .setDescription('Training Management System API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger API Documentation: http://localhost:${port}/api-docs`);
  console.log(`📊 Database: ${process.env.DATABASE_NAME} on ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`);
}
bootstrap();
