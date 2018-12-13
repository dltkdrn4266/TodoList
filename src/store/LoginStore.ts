import {action, observable} from "mobx";
import RootStore from "./RootStore";
import {AsyncStorage, ToastAndroid} from "react-native";

export default class loginStore {
    private rootStore: RootStore;
    @observable public isLoggedIn: boolean = false;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }


}