import {Injectable} from '@nestjs/common';
import {
    ClientProxy,
    Client,
    Transport,
} from '@nestjs/microservices';
import {Observable} from 'rxjs';

import {UserDto} from '../dto/user.dto';
import {CreateUserDto} from '../dto/create-user.dto';
import {USER_MICROSERVICE} from "../configs/microservice.address";

const {port, host} = USER_MICROSERVICE.dev;

@Injectable()
export class UsersService {
    @Client({transport: Transport.TCP, options: {port, host}})
    private client: ClientProxy;

    public create(dto: CreateUserDto): Observable<any> {
        return this.client.send({cmd: 'create'}, dto);
    }

    public findAll(): Observable<UserDto[]> {
        return this.client.send({cmd: 'findAll'}, '');
    }
}
