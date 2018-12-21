import {action, observable} from "mobx";
import {RootStore} from "./rootStore";

export default class SearchStore {
    private rootStore: RootStore;
    @observable searchWords: string = '';

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    public onChangeTextInput = (e: string) => {
        this.searchWords = e;
    }
}