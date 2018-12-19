export interface IUserSerializer {
    id: number;
    username: string;
    authToken: string;
    name: string;
}

export interface ITodoSerializer {
    id: number;
    content: string;
    user: IUserSerializer;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean
}