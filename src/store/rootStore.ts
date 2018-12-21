import AxiosStore from './axiosStore';
import LoginStore from './loginStore';
import TodoStore from './todoStore';
import SearchStore from "./searchStore";
import { configure } from 'mobx';

configure({
    enforceActions: 'observed'
});

export class RootStore {
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

export const STORE_NAME = 'store';

export interface IStoreInjectedProps {
    [STORE_NAME]?: RootStore;
}
