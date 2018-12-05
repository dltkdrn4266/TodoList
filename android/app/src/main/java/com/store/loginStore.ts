import {observable} from "mobx";
import axios from "./axiosStore";
import {AsyncStorage, ToastAndroid} from "react-native";

class loginStore {
    @observable isLoggedIn: boolean = false;


    public loggedIn = (id: string, pw: string) => {
        console.log('loggedIn in id,pw : ',id,pw);
        axios.post('/users/login/',{
            username: id,
            password: pw
        }).then(response => {
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
            console.log(error);
            ToastAndroid.show('로그인 실패', ToastAndroid.BOTTOM);
        })
        this.isLoggedIn = true;
    }
}

export default loginStore;