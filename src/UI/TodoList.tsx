import React from 'react';
import {View, Text, ToastAndroid, AsyncStorage, ToolbarAndroid, StyleSheet} from 'react-native'
import RootStore from '../store/RootStore';
import {inject} from "mobx-react";
import {AxiosResponse, AxiosError} from "axios";
import TodoForm from "./TodoForm";
import {action, observable} from "mobx";
import {NavigationProp} from "react-navigation";
import {todoSerializers} from "../Serializers";

type IProps = {
    rootStore: RootStore;
    // navigation: NavigationProp<???>;
}
@inject('rootStore')
export default class TodoList extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }

    public async componentDidMount() {
        console.log('componentDidMount in');
        await this.getTodoList();
        console.log('componentDidMount out');
    }


    @action
    public getTodoList = async () => {
        console.log('getTodoList in')
        const rootStore = this.props.rootStore as RootStore;
        await rootStore.axiosStore.changeInstance();
        await rootStore.axiosStore.instance.get('/todo/')
            .then((response: AxiosResponse) => {
                console.log(response);
                console.log('response 끝!');
                ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
                rootStore.loginStore.isLoggedIn = true;
                rootStore.todoStore.setTodoList(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
                ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
                rootStore.loginStore.isLoggedIn = false;
            })
        console.log('getTodoList Out');
    }

    private onActionSelected = (position: number) => {
        if(position === 0) {
            this.props.navigation.navigate('addTodoScreen');
        }
    }

    render() {
        if(this.props.rootStore.loginStore.isLoggedIn){
            this.props.navigation.navigate('TodoScreen');
        }
        return(
            <View>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="TodoList"
                    actions={[{title: 'Todo 추가하기',icon: require('../picture/long-arrow-alt-left-solid.svg')},]}
                    onActionSelected={this.onActionSelected}
                />
                {console.log('TodoLIST!!!!!')}
                {this.props.rootStore.todoStore.TodoList.map((item) => (
                    <TodoForm todoSerializers={item} />
                ))}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#2196F3',
        height: 56,
        alignSelf: 'stretch'
    },
})
