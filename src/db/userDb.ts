import { IUser } from "./types";
import { v4 } from 'uuid'

//db
export const users: IUser[] = [
    {
      id: '1',
      username: 'JohnDoe',
      age: 25,
      hobbies: ['Reading', 'Gaming'],
    },
    {
      id: '2',
      username: 'JaneSmith',
      age: 30,
      hobbies: ['Cooking', 'Hiking'],
    },
    {
      id: '3',
      username: 'RobertBrown',
      age: 28,
      hobbies: ['Swimming', 'Coding'],
    },
    {
      id: '4',
      username: 'EmilyJohnson',
      age: 22,
      hobbies: ['Photography', 'Traveling'],
    },
    {
      id: '5',
      username: 'MichaelDavis',
      age: 35,
      hobbies: ['Music', 'Gardening'],
    },
    {
      id: '6',
      username: 'SophiaWilson',
      age: 27,
      hobbies: ['Dancing', 'Drawing'],
    },
    {
      id: '7',
      username: 'JamesMoore',
      age: 32,
      hobbies: ['Fishing', 'Cycling'],
    },
    {
      id: '8',
      username: 'IsabellaClark',
      age: 24,
      hobbies: ['Yoga', 'Writing'],
    },
    {
      id: '9',
      username: 'LiamWalker',
      age: 29,
      hobbies: ['Running', 'Playing Guitar'],
    },
    {
      id: '10',
      username: 'OliviaHall',
      age: 26,
      hobbies: ['Knitting', 'Horseback Riding'],
    },
    {
      id: '11',
      username: 'LucasYoung',
      age: 31,
      hobbies: ['Woodworking', 'Gaming'],
    },
    {
      id: '12',
      username: 'MiaKing',
      age: 21,
      hobbies: ['Painting', 'Reading'],
    },
    {
      id: '13',
      username: 'EthanScott',
      age: 33,
      hobbies: ['Hiking', 'Archery'],
    },
    {
      id: '14',
      username: 'AvaGreen',
      age: 23,
      hobbies: ['Cooking', 'Dancing'],
    },
    {
      id: '15',
      username: 'MasonBaker',
      age: 34,
      hobbies: ['Running', 'Skiing'],
    },
  ];

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



