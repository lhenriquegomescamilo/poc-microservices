/// <reference types="webpack-env" />

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
      .listen(process.env.PORT_MICROSERVICE_GATEWAY, () => console.log('Gateway server is listening with HMR enabled'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
