import React from 'react';
import {View, TextInput, Button, AsyncStorage, ToastAndroid, ToolbarAndroid, StyleSheet} from 'react-native';
import {action, observable} from "mobx";
import RootStore from "../store/RootStore";
import {inject, observer} from "mobx-react";
import {AxiosError, AxiosResponse} from "axios";
import {ITodoSerializers, IUserSerializers} from "../Serializers";

interface IProps {
    rootStore: RootStore;
}
@inject('rootStore')
@observer
export default class Login extends React.Component<IProps,{}> {
    @observable private id: string = '';
    @observable private pw: string = '';
    @observable private isLoggedIn: boolean = true;

    constructor(props: IProps){
        super(props);
    }

    @action
    private idOnChangeHandler = (e: string) => {
        this.id = e;
    }
    @action
    private pwOnChangeHandler = (e: string) => {
        this.pw = e;
    }

    @action
    public loggedIn = async () => {
        const rootStore = this.props.rootStore as RootStore
        try {
            await rootStore.axiosStore.instance.post<IUserSerializers>('https://practice.alpaca.kr/api/users/login/', {
                username: this.id,
                password: this.pw
            }).then(async (response: AxiosResponse) => {
                await AsyncStorage.setItem('authToken', response.data.authToken)
                    .then(() => {
                        rootStore.axiosStore.changeInstance().then(() => {
                            this.isLoggedIn = true;
                            this.props.navigation.navigate('TodoScreen');
                        });
                    })
                    .catch((error: AxiosError) => {
                        this.isLoggedIn = false;
                        console.log(error);
                    });
                ToastAndroid.show('로그인 성공', ToastAndroid.BOTTOM);
            })
        } catch (error) {
            console.log(error);
            ToastAndroid.show('로그인 실패', ToastAndroid.BOTTOM);
        }
    }

    render(){
        return(
            <View>
                <ToolbarAndroid
                    style={styles.toolbar}
                    logo={require('../picture/me-as-icon-with-glass-transparent.png')}
                    title="TodoList"
                />
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

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#2196F3',
        height: 56,
        alignSelf: 'stretch'
    },
})