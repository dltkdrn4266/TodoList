import AxiosStore from './AxiosStore';
import LoginStore from './LoginStore';
import TodoStore from './TodoStore';
import SearchStore from "./SearchStore";
import CalculationTodoStore from "./CalculationTodoStore";

export default class RootStore {
    public axiosStore: AxiosStore;
    public loginStore: LoginStore;
    public todoStore: TodoStore;
    public searchStore: SearchStore;
    public calculationTodoStore: CalculationTodoStore;

    constructor(){
        this.axiosStore = new AxiosStore(this);
        this.loginStore = new LoginStore(this);
        this.todoStore = new TodoStore(this);
        this.searchStore = new SearchStore(this);
        this.calculationTodoStore = new CalculationTodoStore(this);
    }
}
