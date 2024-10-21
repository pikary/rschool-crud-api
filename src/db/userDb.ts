import { IUser } from "./types";
import { v4 } from 'uuid'

//db
export const users: IUser[] = [];

//functions to change db
export const getAllUsers = (): IUser[] => {
    return users;
};

export const getUserById = (id: string): IUser | undefined => {
    return users.find((user) => user.id === id);
};

export const createUser = (username: string, age: number, hobbies: string[]): IUser => {
    const newUser: IUser = {
        id: v4(),
        username,
        age,
        hobbies,
    };
    users.push(newUser);
    return newUser;
};

export const updateUser = (id: string, username: string, age: number, hobbies: string[]): IUser | undefined => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { id, username, age, hobbies };
        return users[userIndex];
    }
    return undefined;
};

export const deleteUser = (id: string): boolean => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
};



