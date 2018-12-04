import {AsyncStorage} from "react-native";
import axios from 'axios';

const instance = AsyncStorage.getItem('token') ?
    axios.create({
        baseURL: 'https://practice.alpaca.kr/api/',
        headers: { 'Authorization': 'Token ' + AsyncStorage.getItem('token')}
    }) :
    axios.create({
        baseURL: 'https://practice.alpaca.kr/api/'
    })

export default instance;
