export interface IUserAuth {
    userName: string;
    password: string;
}

export class Advertiser implements IUserAuth {
    id!: number;
    firstName!: string;
    lastName!: string;
    userName!: string;
    password!: string;
    phoneNumber!: string;
    email!: string;
    address!: string;
}