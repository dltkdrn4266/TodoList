export interface userSerializers {
    id: number;
    username: string;
    authToken: string;
    name: string;
}

export interface todoSerializers {
    id: number;
    content: string;
    user: userSerializers;
    like: number;
    createdAt: string;
    completedAt: string;
    isCompleted: boolean
}