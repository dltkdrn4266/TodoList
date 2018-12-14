import React from 'react';
import {View, Text, ToastAndroid, AsyncStorage, ToolbarAndroid, StyleSheet, ScrollView} from 'react-native'
import RootStore from '../store/RootStore';
import {inject, observer} from "mobx-react";
import {AxiosResponse, AxiosError} from "axios";
import TodoForm from "./TodoForm";
import {action, observable} from "mobx";
import {NavigationProp, NavigationScreenProp} from "react-navigation";
import {ITodoSerializers} from "../Serializers";
import Search from "./Search";

interface IProps {
    rootStore: RootStore;
    navigation: NavigationScreenProp<{}>;
}
@inject('rootStore')
@observer
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
        await rootStore.axiosStore.instance.get<ITodoSerializers>('/todo/')
            .then((response: AxiosResponse) => {
                console.log(response);
                console.log('response 끝!');
                rootStore.todoStore.setTodoList(response.data);
                ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
                rootStore.loginStore.isLoggedIn = true;
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
            <ScrollView style={styles.scrollView} >
                    <ToolbarAndroid
                        style={styles.toolbar}
                        title="TodoList"
                        actions={[{title: 'Todo 추가하기',icon: require('../picture/long-arrow-alt-left-solid.svg')},]}
                        onActionSelected={this.onActionSelected}
                    />
                    <Search rootStore={this.props.rootStore}/>
                    {this.props.rootStore.todoStore.TodoList.map((item) => (
                        <TodoForm key={item.id} todoSerializers={item} />
                    ))}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#2196F3',
        height: 56,
        alignSelf: 'stretch'
    },
    scrollView: {
        flex: 1,
        height: 'auto'
    }
})
