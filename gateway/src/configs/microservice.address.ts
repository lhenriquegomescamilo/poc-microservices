
export const USER_MICROSERVICE: IConfigMicroservice = {
    hosts: {url: process.env.URL_MICROSERVICE_USER, port: (process.env.PORT_MICROSERVICE_USER || 3002) as number},
};

export interface IConfigMicroservice {
    hosts: { url: string, port: number };
}
