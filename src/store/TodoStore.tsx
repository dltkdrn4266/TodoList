import React from 'react';
import {todoSerializers} from "../Serializers";
import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

export default class TodoStore {
    public TodoList: todoSerializers[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    public setTodoList = (data: todoSerializers[]) => {
        console.log('set 이전 data의 값');
        console.log(data);
        this.TodoList = data;
        console.log('set 이후 TodoList');
        console.log(this.TodoList);
    }

    public addTodoList = async(data: string) => {
        await this.rootStore.axiosStore.changeInstance();
        await this.rootStore.axiosStore.instance.post('/todo/', {
            content: data
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }




}