import RootStore from "./RootStore";
import {observable} from "mobx";

export default class CalculationTodoStore {

    private rootStore: RootStore;

    @observable completeTodo: number;
    @observable allTodo: number;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.allTodo = 0;
        this.completeTodo = 0;
    }

    public setAllTodo = () => {
        const todoArray = this.rootStore.todoStore.TodoList.slice();
        this.allTodo = todoArray.length;
    }

    public setCompleteTodo = () => {
        this.completeTodo = this.rootStore.todoStore.TodoList.slice().filter(function (item) {
                return item.isCompleted === true;
            }).length;
        console.log('setCompleteTodo');
        console.log(this.completeTodo);
    }

}