import {Get, Controller, Post, Body} from '@nestjs/common';
import {UsersService} from './users.service';
import {Observable} from 'rxjs';

import {UserDto} from '../dto/user.dto';
import {CreateUserDto} from '../dto/create-user.dto';

@Controller('/api/users')
export class UsersController {
    public constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Post()
    public create(@Body() dto: CreateUserDto): Observable<any> {
        console.log('GATEWAY CREATE', dto);
        return this.usersService.create(dto);
    }

    @Get()
    public findAll(): Observable<UserDto[]> {
        return this.usersService.findAll();
    }
}
