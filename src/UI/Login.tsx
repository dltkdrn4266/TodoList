import React from 'react';
import {View, TextInput, Button, AsyncStorage, ToastAndroid} from 'react-native';
import {action, observable} from "mobx";
import RootStore from "../store/RootStore";
import {inject} from "mobx-react";

type props = {
    rootStore: RootStore;
}
@inject('rootStore')
export default class Login extends React.Component {
    constructor(props: props){
        super(props);
        const rootStore = this.props.rootStore as RootStore;
    }
    @observable id: string = '';
    @observable pw: string = '';

    @action
    private idOnChangeHandler = (e: string) => {
        this.id = e;
    }
    @action
    private pwOnChangeHandler = (e: string) => {
        this.pw = e;
    }

    @action
    public loggedIn = () => {
        const rootStore = this.props.rootStore as RootStore
        rootStore.axiosStore.instance.post('https://practice.alpaca.kr/api/users/login/', {
            username: this.id,
            password: this.pw
        }).then(response => {
            AsyncStorage.setItem('authToken', response.data.authToken)
                .then(() => {
                    rootStore.axiosStore.changeInstance().then(() => {
                        console.log('instance@');
                        console.log(rootStore.axiosStore.instance);
                        console.log('instance@');
                        this.props.navigation.navigate('TodoScreen');
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            ToastAndroid.show('로그인 성공', ToastAndroid.BOTTOM);
        }).catch(error => {
            console.log(error);
            ToastAndroid.show('로그인 실패', ToastAndroid.BOTTOM);
        })
    }

    render(){
        return(
            <View>
                <TextInput
                    placeholder={'insert id'}
                    onChangeText={this.idOnChangeHandler}
                />
                <TextInput
                    placeholder={'insert password'}
                    onChangeText={this.pwOnChangeHandler}
                />
                <Button title={"Login"} onPress={this.loggedIn}/>
            </View>
        );
    }
}