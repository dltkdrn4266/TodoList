import AxiosStore from './AxiosStore';
import LoginStore from './LoginStore';
import TodoStore from './TodoStore';
import SearchStore from "./SearchStore";

export default class RootStore {
    public axiosStore: AxiosStore;
    public loginStore: LoginStore;
    public todoStore: TodoStore;
    public searchStore: SearchStore;

    constructor(){
        this.axiosStore = new AxiosStore(this);
        this.loginStore = new LoginStore(this);
        this.todoStore = new TodoStore(this);
        this.searchStore = new SearchStore(this);
    }
}
