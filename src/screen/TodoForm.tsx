import React from 'react';
import {View, TextInput, StyleSheet, ToastAndroid, Button} from "react-native";
import {action, observable} from "mobx";
import {inject, observer} from "mobx-react";
import {IStoreInjectedProps, RootStore, STORE_NAME} from "../store/rootStore";
import {NavigationScreenProp} from "react-navigation";

interface IProps extends IStoreInjectedProps{
    navigation: NavigationScreenProp<{}>;
}
@inject(STORE_NAME)
@observer
export default class todoForm extends React.Component<IProps,{}> {
    @observable private content: string = '';


    constructor(props: IProps) {
        super(props);
    }

    @action
    private contentOnChangeHandler = (event: string) => {
        this.content = event;
    }

    private onPressWriteButton = async() => {
        const rootStore = this.props[STORE_NAME] as RootStore;

        if(this.content !== '') {
            try {
                await rootStore.todoStore.addTodoList(this.content);
                ToastAndroid.show('Todo가 추가되었습니다', ToastAndroid.BOTTOM);
                this.props.navigation.navigate('TodoScreen');
            } catch (error) {
                console.log('TodoFormScreen onPressWriteButton');
                console.log(error);
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