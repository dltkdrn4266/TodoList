import React from 'react';
import {View, TextInput, StyleSheet, ToastAndroid, Button} from "react-native";
import {action, observable} from "mobx";
import {inject, observer} from "mobx-react";
import RootStore from "../store/RootStore";
import {NavigationScreenProp} from "react-navigation";

interface IProps {
    rootStore: RootStore;
    navigation: NavigationScreenProp<{}>;
}
// TODO: Todo 가 늘어날수록 렉이 너무 심해짐
@inject('rootStore')
export default class addTodoScreen extends React.Component<IProps,{}> {
    @observable private content: string = '';


    constructor(props: IProps) {
        super(props);
    }

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
                this.props.rootStore.calculationTodoStore.allTodo += 1;
                this.props.navigation.navigate('TodoScreen');
            } catch (e) {
                console.log('addTodoList Error');
            }
        } else {
            ToastAndroid.show('Todo를 입력해주세요', ToastAndroid.BOTTOM);
        }
    }

    render() {
        return(
            <View style={styles.view}>
                <TextInput style={styles.textInput} placeholder={'Todo 입력'} onChangeText={this.contentOnChangeHandler}/>
                <Button title={"작성하기"} onPress={this.onPressWriteButton}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginTop: 20
    },
    textInput: {
    },
    button: {
        backgroundColor: '#66d6a0'
    }
})