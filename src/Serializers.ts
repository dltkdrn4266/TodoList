export interface IUserSerializers {
    id: number;
    username: string;
    authToken: string;
    name: string;
}
export class user{
    public id: number;
    public username: string;
    public authToken: string;
    public name: string;

    constructor(user: user){
        this.id = user.id;
        this.username = user.username;
        this.authToken = user.authToken;
        this.name = user.name;
    }
}

export interface ITodoSerializers {
    id: number;
    content: string;
    user: user;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean
}