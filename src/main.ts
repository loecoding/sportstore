import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      /*ValidateError
    disableErrorMessages: true,
    transform: true,
    validationError: {target: true , value: true} ,
    stopAtFirstError: true ,
    // errorHttpStatusCode: 503
    exceptionFactory: (errors) =>{
      throw new BadRequestException(errors.map(err => `${err.property} : ${err.value} : ${Object.keys(err.constraints).map
        ( key=> err.constraints[key]).join(" , ") }` ))
    }*/
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
