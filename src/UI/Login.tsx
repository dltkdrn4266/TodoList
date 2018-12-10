import React from 'react';
import {View, TextInput, Button} from 'react-native';
import LoginStore from '../store/LoginStore';
import {action, observable} from "mobx";

const loginStore = new LoginStore();

export default class Login extends React.Component {
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

    public isLoggedIn = () => {
        loginStore.loggedIn(this.id,this.pw);
        console.log('in isLoggedIn');
        this.props.navigation.navigate('TodoScreen')
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
                <Button title={"Login"} onPress={this.isLoggedIn}/>

                {console.log('id' + this.id)}
                {console.log('pw' + this.pw)}
            </View>
        );
    }
}