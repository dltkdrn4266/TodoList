import {action, observable} from "mobx";
import RootStore from "./RootStore";

export default class SearchStore {
    private rootStore: RootStore;
    @observable searchWords: string;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.searchWords = '';
    }

    @action
    public onChangeTextInput = (e: string) => {
        this.searchWords = e;
    }
}