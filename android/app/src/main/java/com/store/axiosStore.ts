import {AsyncStorage} from "react-native";
import axios from 'axios';

const StoreData = async () => {
    try {
        const value = await AsyncStorage.getItem('authToken');
        if(value !== null) {
            console.log('AsyncStorage Value : ' + value);
            return true;
        }
    }catch (error) {
        console.log(error);
        return false;
    }
}

const instance = StoreData ?
    axios.create({
        baseURL: 'https://practice.alpaca.kr/api/',
        headers: {'Authorization': 'Token' + AsyncStorage.getItem('authToken')}
    }) :
        axios.create({
        baseURL: 'https://practice.alpaca.kr/api/'
    })


export default instance;
