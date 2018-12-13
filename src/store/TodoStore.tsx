import React from 'react';
import {todoSerializers} from "../Serializers";
import RootStore from "./RootStore";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

export default class TodoStore {
    @observable public TodoList: todoSerializers[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    public setTodoList = (data: todoSerializers[]) => {
        console.log('set 이전 data의 값');
        console.log(data);
        this.TodoList = data;
        console.log('set 이후 TodoList');
        console.log(this.TodoList);
    }

    public addTodoList = async(data: string) => {

        try{
            await this.rootStore.axiosStore.changeInstance();
        } catch (e) {
            console.log('changeInstance Error');
        }

        try{
            await this.rootStore.axiosStore.instance.post('/todo/', {
                content: data
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (e) {
            console.log('axiosStore.instance.post Error');
        }

    }




}