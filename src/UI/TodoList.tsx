import React from 'react';
import {View, Text, ToastAndroid, AsyncStorage} from 'react-native'
import RootStore from '../store/RootStore';
import {inject} from "mobx-react";

type props = {
    rootStore: RootStore;
}
@inject('rootStore')
export default class TodoList extends React.Component {

    constructor(props: props) {
        super(props);
        const rootStore = this.props.rootStore as RootStore;
        AsyncStorage.getItem('authToken').then(response =>{
            console.log('getItem');
            console.log(response);
        })
        rootStore.axiosStore.instance.get('https://practice.alpaca.kr/api/todo/')
            .then(response => {
                console.log(response);
                ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
            })
            .catch(error => {
                console.log(error);
                ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
            })
    }



    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>TodoList Screen</Text>
            </View>
        )
    }
}
