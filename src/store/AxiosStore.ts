import axios from 'axios';
import {action, observable} from "mobx";
import RootStore from "./RootStore";
import {AsyncStorage} from "react-native";

export default class AxiosStore {
    @observable public instance = axios.create(undefined);
    private rootStore: RootStore;
    private temp?: string = '';

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    private retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('authToken');
            if (value !== null) {
                this.temp = value;
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action
    public changeInstance = () => {
        return new Promise((resolve) => {
            this.retrieveData().then(() => {
                this.rootStore.axiosStore.instance = axios.create({
                    baseURL: 'https://practice.alpaca.kr/api/',
                    headers: { 'Authorization': 'Token ' + this.temp }
                })
                resolve();
            })
        })
    }
}
