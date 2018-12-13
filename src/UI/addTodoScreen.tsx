import React from 'react';
import {View, TextInput, StyleSheet} from "react-native";
import {Button} from "react-native-material-ui";
import {action, observable} from "mobx";
import {inject, observer} from "mobx-react";
import RootStore from "../store/RootStore";

interface IProps {
    rootStore: RootStore;
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
        await rootStore.todoStore.addTodoList(this.content);
        this.props.navigation.navigate('TodoScreen');
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