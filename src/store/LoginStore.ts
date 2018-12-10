import {action, observable, observe} from "mobx";
import axios from "./AxiosStore";
import RootStore from "./RootStore";
import {AsyncStorage, ToastAndroid} from "react-native";

class loginStore {
    @observable private isLoggedIn: boolean = false;
    // private rootStore: RootStore;

    // constructor(rootStore: RootStore){
    //     this.rootStore = rootStore;
    // }

    @action
    public loggedIn = (id: string, pw: string) => {
        console.log('loggedIn in id,pw : ',id,pw);
        axios.post('/users/login/',{
            username: id,
            password: pw
        }).then(response => {
            this.isLoggedIn = true;
            console.log(response.data.authToken);
            ToastAndroid.show('로그인 성공', ToastAndroid.BOTTOM);
            const setItem = async () => {
                try {
                    await AsyncStorage.setItem('authToken', response.data.authToken);
                } catch (error) {
                    console.log(error);
                }
            }
        }).catch(error => {
            this.isLoggedIn = false;
            console.log(error);
            ToastAndroid.show('로그인 실패', ToastAndroid.BOTTOM);
        })
    }
}

export default loginStore;