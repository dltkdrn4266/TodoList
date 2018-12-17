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
        this.allTodo = this.rootStore.todoStore.TodoList.length;
    }

    public setCompleteTodo = () => {
        this.completeTodo = this.rootStore.todoStore.TodoList.map((item) => ( item.completedAt === null )).length;
        console.log('setCompleteTodo');
        console.log(this.completeTodo);
    }

}