import axios from 'axios';
import {action, observable} from "mobx";
import RootStore from "./RootStore";
import {AsyncStorage} from "react-native";

export default class AxiosStore {
    @observable public instance = axios.create(undefined);
    @observable public isLoggedIn: boolean;
    private rootStore: RootStore;
    private temp?: string = '';

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.isLoggedIn = true;
        console.log('instance');
        console.log(this.instance);
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
        this.retrieveData().then(() => {
            console.log('Token ' + this.temp);
            console.log('in retrieveData');
            this.rootStore.axiosStore.instance = axios.create({
                baseURL: 'https://practice.alpaca.kr/api/',
                headers: { 'Authorization': 'Token ' + this.temp }
            })
            console.log('instance!');
            console.log(this.instance);
        })
        // if(this.instance !== undefined){
        //     this.isLoggedIn = true;
        // }
    }
}
