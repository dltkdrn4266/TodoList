import {AsyncStorage} from "react-native";
import axios from 'axios';

const storeData = async () => {
    try {
        const value = await AsyncStorage.getItem('authToken');
        if(value !== null) {
            return true;
        }
        return false;
    }catch (error) {
        console.log(error);
        return false;
    }
}

const instance = storeData ?
    axios.create({
        baseURL: 'https://practice.alpaca.kr/api/',
        headers: {'Authorization': 'Token' + AsyncStorage.getItem('authToken')}
    }) :
    axios.create({
        baseURL: 'https://practice.alpaca.kr/api/'
    })


export default instance;
