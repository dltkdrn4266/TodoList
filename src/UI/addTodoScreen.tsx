import React from 'react';
import {View, TextInput, StyleSheet, ToastAndroid} from "react-native";
import {Button} from "react-native-material-ui";
import {action, observable} from "mobx";
import {inject, observer} from "mobx-react";
import RootStore from "../store/RootStore";
import {NavigationScreenProp} from "react-navigation";

interface IProps {
    rootStore: RootStore;
    navigation: NavigationScreenProp<{}>;
}

@inject('rootStore')
export default class addTodoScreen extends React.Component<IProps,{}> {
    @observable private content: string = '';

    @action
    private contentOnChangeHandler = (event: string) => {
        this.content = event;
    }

    private onPressWriteButton = async() => {
        const rootStore = this.props.rootStore as RootStore;

        if(this.content !== '') {
            try {
                const response = await rootStore.todoStore.addTodoList(this.content);
                ToastAndroid.show('Todo가 추가되었습니다', ToastAndroid.BOTTOM);
                this.props.navigation.navigate('TodoScreen');
            } catch (e) {
                console.log('addTodoList Error');
            }
        } else {
            ToastAndroid.show('Todo를 입력해주세요',ToastAndroid.BOTTOM);
        }
    }

    render() {
        return(
            <View style={style.View}>
                <TextInput style={style.TextInput} placeholder={'Todo 입력'} onChangeText={this.contentOnChangeHandler}/>
                <Button text={"작성하기"} onPress={this.onPressWriteButton}/>
            </View>
        )
    }
}


const style = StyleSheet.create({
    View: {
        flex: 1
    },
    TextInput: {
    }
})