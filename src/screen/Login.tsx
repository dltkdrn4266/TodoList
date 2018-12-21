import React from 'react';
import {View, TextInput, Button, AsyncStorage, ToastAndroid, Image, StyleSheet, Text} from 'react-native';
import {action} from "mobx";
import {IStoreInjectedProps, RootStore, STORE_NAME} from "../store/rootStore";
import {inject, observer} from "mobx-react";
import {AxiosError, AxiosResponse} from "axios";
import {IUserSerializer} from "../Serializers";
import {NavigationScreenProp} from "react-navigation";

interface IProps extends IStoreInjectedProps{
    navigation: NavigationScreenProp<{}>;
}
@inject(STORE_NAME)
@observer
export default class Login extends React.Component<IProps,{}> {

    constructor(props: IProps){
        super(props);
        this.isLoggedIn();
    }

    public isLoggedIn = async () => {
        const rootStore = this.props[STORE_NAME] as RootStore;
        try {
            const value = await AsyncStorage.getItem('authToken');
            if (value !== null) {
                await rootStore.axiosStore.changeInstance();
                this.props.navigation.navigate('TodoScreen');
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action
    public loggedIn = async () => {
        const rootStore = this.props[STORE_NAME] as RootStore
        try {
            await rootStore.axiosStore.instance.post<IUserSerializer>('https://practice.alpaca.kr/api/users/login/', {
                username: this.props[STORE_NAME]!.loginStore.id,
                password: this.props[STORE_NAME]!.loginStore.pw
            }).then(async (response: AxiosResponse) => {
                await AsyncStorage.setItem('authToken', response.data.authToken)
                    .then(() => {
                        rootStore.axiosStore.changeInstance().then(() => {
                            this.props.navigation.navigate('TodoScreen');
                        });
                    })
                    .catch((error: AxiosError) => {
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
                    onChangeText={this.props[STORE_NAME]!.loginStore.idOnChangeHandler}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'password'}
                    onChangeText={this.props[STORE_NAME]!.loginStore.pwOnChangeHandler}
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