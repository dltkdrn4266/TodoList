export class userSerializers {
    public id: number;
    public username: string;
    public authToken: string;
    public name: string;
}

export class todoSerializers {
    public id: number;
    public content: string;
    public user: userSerializers;
    public like: number;
    public createdAt: string;
    public completedAt: string;
    public isCompleted: boolean
}