const host = (process.env.URL_MICROSERVICE_DATABASE || 'localhost') as string;
const port = (process.env.PORT_MICROSERVICE_DATABASE || 3001) as number;

export const DATABASE_MICROSERVICE: IConfigMicroservice = ({uri: {host, port}});

export interface IConfigMicroservice {
    uri?: { host: string, port: number };
}
