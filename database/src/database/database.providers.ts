import {Sequelize} from 'sequelize-typescript';
import {User} from '../users/user.entity';

export const DatabaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                operatorsAliases: false,
                dialect: 'mysql',
                host: 'mysql',
                port: 3306,
                username: 'root',
                password: 'ENGLAND_IS_MY_CITY',
                database: 'microservices',
                url: process.env.MYSQL_URL
,            });
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
