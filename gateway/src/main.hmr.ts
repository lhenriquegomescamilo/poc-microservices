/// <reference types="webpack-env" />

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

declare const module: any;
const port = (process.env.PORT_MICROSERVICE_GATEWAY || 3000) as number;

async function bootstrap() {
    const showServerIsRunning: () => void = () => console.log('Gateway server is listening with HMR enabled');
    const app = await NestFactory.create(AppModule);
    await app
        .listen(port, showServerIsRunning);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
