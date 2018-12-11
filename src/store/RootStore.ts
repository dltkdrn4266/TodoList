import AxiosStore from './AxiosStore';
import LoginStore from './LoginStore';
import TodoStore from './TodoStore';

export default class RootStore {
    public axiosStore: AxiosStore;
    public loginStore: LoginStore;
    public todoStore: TodoStore;

    constructor(){
        this.axiosStore = new AxiosStore(this);
        this.loginStore = new LoginStore(this);
        this.todoStore = new TodoStore(this);
    }
}
