import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export interface IRequestBody extends Omit<IUser, 'id'> {
    username: string;
    age: number;
    hobbies: string[];
}