import {observable} from "mobx";
import {todoSerializers} from "../Serializers";
import RootStore from "./RootStore";
import {AsyncStorage, ToastAndroid} from "react-native"

export default class TodoStore {
    @observable private TodoList: todoSerializers[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }


}