
export const USER_MICROSERVICE = {
    dev: {host: 'localhost', port: 3002}
}


export interface IConfigMicroservice {
    dev: { host: string, port: number },
    hom: { host: string, port: number },
    prehom: { host: string, port: number },
    prod: { host: string, port: number },
}
