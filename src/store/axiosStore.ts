import axios from 'axios';
import {action, observable} from "mobx";
import {RootStore} from "./rootStore";
import {AsyncStorage} from "react-native";

export default class AxiosStore {
    @observable public instance = axios.create();
    private rootStore: RootStore;
    private temp: string = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    private retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('authToken');
            if (value !== null) {
                this.temp = value;
            }
        } catch (error) {
            console.log('axiosStore retrieveData');
            console.log(error);
        }
    }
    @action
    public changeInstance = async () => {
        try{
            await this.retrieveData();
            this.rootStore.axiosStore.instance = axios.create({
                baseURL: 'https://practice.alpaca.kr/api/',
                headers: {'Authorization': 'Token ' + this.temp}
            })
        }catch (e){
            console.log('retrieveData Error');
        }
    }
}