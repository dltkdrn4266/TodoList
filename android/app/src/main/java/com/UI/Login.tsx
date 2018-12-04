import React from 'react';
import {View, TextInput, Button} from 'react-native';
import LoginStore from '../store/loginStore';
import {observable} from "mobx";

export default class Login extends React.Component {
    @observable id: string = '';
    @observable pw: string = '';

    constructor(props:{}) {
        super(props);

    }

    private IdOnChangeHandler = (e: string) => {
        this.id = e;
    }
    private PwOnChangeHandler = (e: string) => {
        this.pw = e;
    }

    public islogined = () => {
        LoginStore.logined(this.id,this.pw);
    }


    render(){
        return(
            <View>
                <TextInput
                    placeholder={'insert id'}
                    onChangeText={this.IdOnChangeHandler}
                    value={this.id}
                />
                <TextInput
                    placeholder={'insert password'}
                    onChangeText={this.PwOnChangeHandler}
                    value={this.pw}
                />
                <Button title={"Login"} onPress={this.islogined}/>

                {console.log('id' + this.id)}
                {console.log('pw' + this.pw)}
            </View>
        );
    }
}