import {action, observable} from "mobx";
import RootStore from "./rootStore";

export default class loginStore {
    private rootStore: RootStore;
    @observable public id: string = '';
    @observable public pw: string = '';

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    public idOnChangeHandler = (e: string) => {
        this.id = e;
        console.log(this.id);
    }
    @action
    public pwOnChangeHandler = (e: string) => {
        this.pw = e;
        console.log(this.pw);
    }
}