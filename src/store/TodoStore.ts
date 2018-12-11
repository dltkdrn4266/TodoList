import {action, observable} from "mobx";
import {todoSerializers} from "../Serializers";
import RootStore from "./RootStore";

export default class TodoStore {
    @observable private TodoList: todoSerializers[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    public setTodoList = (data: todoSerializers[]) => {
        this.TodoList = data;
    }


}