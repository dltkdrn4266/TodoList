import React from 'react';
import {View, TextInput, Button} from 'react-native';
import LoginStore from '../store/loginStore';
import {action, observable} from "mobx";

const loginStore = new LoginStore();

export default class Login extends React.Component {
    @observable id: string = '';
    @observable pw: string = '';

    constructor(props:{}) {
        super(props);

    }
    @action
    private IdOnChangeHandler = (e: string) => {
        this.id = e;
        console.log(this.id);
    }
    @action
    private PwOnChangeHandler = (e: string) => {
        this.pw = e;
        console.log(this.pw);
    }

    public isLoggedIn = () => {
        loginStore.loggedIn(this.id,this.pw);
    }


    render(){
        return(
            <View>
                <TextInput
                    placeholder={'insert id'}
                    onChangeText={this.IdOnChangeHandler}
                />
                <TextInput
                    placeholder={'insert password'}
                    onChangeText={this.PwOnChangeHandler}
                />
                <Button title={"Login"} onPress={this.isLoggedIn}/>

                {console.log('id' + this.id)}
                {console.log('pw' + this.pw)}
            </View>
        );
    }
}