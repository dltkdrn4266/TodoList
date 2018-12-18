import React from 'react';
import {View, TextInput, Button, AsyncStorage, ToastAndroid, Image, StyleSheet, Text} from 'react-native';
import {action, observable} from "mobx";
import RootStore from "../store/RootStore";
import {inject, observer} from "mobx-react";
import {AxiosError, AxiosResponse} from "axios";
import {IUserSerializers} from "../Serializers";
import {NavigationScreenProp} from "react-navigation";
import CheckBox from 'react-native-elements';

interface IProps {
    rootStore: RootStore;
    navigation: NavigationScreenProp<{}>;
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
            <View style={styles.view}>
                <Image style={styles.image} source={require('../picture/todolist-18-453844.png')}/>
                <Text style={styles.text}>TodoList</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Username'}
                    onChangeText={this.idOnChangeHandler}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'password'}
                    onChangeText={this.pwOnChangeHandler}
                />
                <View style={styles.button}>
                    <Button title={"Login"} onPress={this.loggedIn}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: 300,
        backgroundColor: '#ffffff'
    },
    button: {
        width: 300
    },
    image: {
        marginBottom: 20
    },
    text: {
        fontSize: 40,
        marginBottom: 20
    }

})