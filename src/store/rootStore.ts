import AxiosStore from './axiosStore';
import LoginStore from './loginStore';
import TodoStore from './todoStore';
import SearchStore from "./searchStore";
import CalculationTodoStore from "./calculationTodoStore";
import ItemStore from "./itemStore";
import { configure } from 'mobx';

configure({
    enforceActions: 'observed'
})

export default class RootStore {
    public axiosStore: AxiosStore;
    public loginStore: LoginStore;
    public todoStore: TodoStore;
    public searchStore: SearchStore;
    public calculationTodoStore: CalculationTodoStore;
    public itemStore: ItemStore

    constructor(){
        this.axiosStore = new AxiosStore(this);
        this.loginStore = new LoginStore(this);
        this.todoStore = new TodoStore(this);
        this.searchStore = new SearchStore(this);
        this.calculationTodoStore = new CalculationTodoStore(this);
        this.itemStore = new ItemStore(this);
    }
}
