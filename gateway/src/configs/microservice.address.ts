export const USER_MICROSERVICE: IConfigMicroservice = {
    hosts: {url: 'users', port: 3002},
};

export interface IConfigMicroservice {
    hosts: { url: string, port: number };
}
