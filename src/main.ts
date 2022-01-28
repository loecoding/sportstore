import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true,
    // transform: true,
    // validationError: {target: true , value: true}
    stopAtFirstError: true ,
    // errorHttpStatusCode: 503
    exceptionFactory: (errors) =>{
      // console.log(errors)
      throw new BadRequestException(errors.map(err => `${err.property} : ${err.value} : ${Object.keys(err.constraints).map
        ( key=> err.constraints[key]).join(" , ") }` ))
    }
  }));
  await app.listen(3000);
}
bootstrap();
