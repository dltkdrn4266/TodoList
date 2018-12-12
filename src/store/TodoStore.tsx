import React from 'react';
import {action, observable} from "mobx";
import {todoSerializers} from "../Serializers";
import RootStore from "./RootStore";
import TodoForm from "../UI/TodoForm";
import {ViewComponent} from "react-native";

export default class TodoStore {
    public TodoList: todoSerializers[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    public setTodoList = (data: todoSerializers[]) => {
        this.TodoList = data;
    }

    public getTodoList = () => {
        return this.TodoList;
    }




}