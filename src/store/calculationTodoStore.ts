import RootStore from "./rootStore";
import {action, observable} from "mobx";

export default class CalculationTodoStore {

    private rootStore: RootStore;

    @observable completeTodo: number = 0;
    @observable allTodo: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    public setAllTodo = () => {
        const todoArray = this.rootStore.todoStore.todoList.slice();
        this.allTodo = todoArray.length;
    }

    @action
    public setCompleteTodo = () => {
        this.completeTodo = this.rootStore.todoStore.todoList.slice().filter(function (item) {
                return item.isCompleted === true;
            }).length;
    }

}