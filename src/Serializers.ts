export interface userSerializers {
    id: number;
    username: string;
    authToken: string;
    name: string;
}
export class user implements userSerializers{
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

export interface todoSerializers {
    id: number;
    content: string;
    user: user;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean
}