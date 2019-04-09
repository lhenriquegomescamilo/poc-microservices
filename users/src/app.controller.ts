import {Controller} from '@nestjs/common';
import {MessagePattern, ClientProxy, Transport, Client} from '@nestjs/microservices';
import {Observable} from 'rxjs';

import {UserDto} from './dto/user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {DATABASE_MICROSERVICE} from './configs/microservice.address';

const {host, port} = DATABASE_MICROSERVICE.uri;

@Controller()
export class AppController {
    @Client({transport: Transport.TCP, options: {host, port}})
    private databaseMicroservice: ClientProxy;

    @MessagePattern({cmd: 'create'})
    public create(dto: CreateUserDto): Observable<any> {
        return this.databaseMicroservice.send({cmd: 'create'}, dto);
    }

    @MessagePattern({cmd: 'findAll'})
    public findAll(data: string): Observable<UserDto[]> {
        return this.databaseMicroservice.send({cmd: 'findAll'}, data);
    }
}
