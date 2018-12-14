import React from 'react';
import {ITodoSerializers} from "../Serializers";
import RootStore from "./RootStore";
import {action, observable} from "mobx";

export default class TodoStore {
    @observable public TodoList: ITodoSerializers[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.TodoList = [];
        console.log('TodoStore constructor');
    }

    @action
    public setTodoList = (data: ITodoSerializers[]) => {
        console.log('set 이전 data의 값');
        console.log(data);
        this.rootStore.todoStore.TodoList = data;
        console.log('set 이후 TodoList');
        console.log(this.rootStore.todoStore.TodoList);
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
                    this.TodoList.push(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (e) {
            console.log('axiosStore.instance.post Error');
        }

    }

    @action
    public deleteTodo = async (id: number, todo: ITodoSerializers) => {
        try{
            const response = await this.rootStore.axiosStore.instance.delete('/todo/' + id + '/');
            this.TodoList.splice(this.TodoList.indexOf(todo),1);
            console.log('delete Response');
            console.log(response)
        }catch (error) {
            console.log(error);
        }
    }

    public completeTodo = async (id: number) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializers>('/todo/' + id + '/complete/');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    public revertTodo = async (id: number) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializers>('/todo/' + id + '/revert_complete/');
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }




}