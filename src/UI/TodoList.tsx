import React from 'react';
import {View, Text, ToastAndroid, AsyncStorage, ToolbarAndroid, StyleSheet} from 'react-native'
import RootStore from '../store/RootStore';
import {inject} from "mobx-react";
import {AxiosResponse, AxiosError} from "axios";
import TodoForm from "./TodoForm";

type IProps = {
    rootStore: RootStore;
}
@inject('rootStore')
export default class TodoList extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
        // const rootStore = this.props.rootStore as RootStore;
        // rootStore.axiosStore.changeInstance().then(() => {
        //     this.getTodoList().then(() => {
        //         this.showTodoList();
        //     });
        // });
        this.getTodoList().then(() => {
            this.showTodoList();
        })
    }

    public showTodoList = () => {
        const rootStore = this.props.rootStore as RootStore;
        console.log('showTodoList');
        let todoView: any = [];
        console.log('안녕 밑에있는건 rootStore.todoStore.TodoList야!')
        console.log(rootStore.todoStore.TodoList);
        console.log('잘가');
        for(const todoId in rootStore.todoStore.TodoList) {
            if(todoId !== null) {
                const createdDate = new Date(rootStore.todoStore.TodoList[todoId].createdAt);
                const createdYear = createdDate.getFullYear();
                const createdMonth = createdDate.getMonth() + 1;
                const createdDay = createdDate.getDate();
                const createdHour = createdDate.getHours();
                const createdMinutes = createdDate.getMinutes();

                const completedDate = new Date(rootStore.todoStore.TodoList[todoId].createdAt);
                const completedYear = completedDate.getFullYear();
                const completedMonth = completedDate.getMonth() + 1;
                const completedDay = completedDate.getDate();
                const completedHour = completedDate.getHours();
                const completedMinutes = completedDate.getMinutes();

                const completedAt = completedYear + '/' + completedMonth + '/' + completedDay + '   ' + completedHour + '시' + completedMinutes + '분';

                todoView = rootStore.todoStore.TodoList.map((todoId) => {
                    <TodoForm
                        id={todoId.id}
                        content={todoId.content}
                        user={todoId.user}
                        like={todoId.like}
                        createdAt={todoId.createdAt}
                        completedAt={todoId.completedAt}
                        isCompleted={todoId.isCompleted}
                    />
                });
            }
        }
        console.log('todoView@');
        console.log(todoView);
        return todoView;
    }


    public getTodoList = () => {
        return new Promise(resolve => {
            const rootStore = this.props.rootStore as RootStore;
            rootStore.axiosStore.changeInstance().then(() => {
                rootStore.axiosStore.instance.get('/todo/')
                    .then((response: AxiosResponse) => {
                        console.log(response);
                        ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
                        rootStore.todoStore.setTodoList(response.data);
                        resolve();
                    })
                    .catch((error: AxiosError) => {
                        console.log(error);
                        ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
                    })
            })
        })
    }

    private onActionSelected = (position: number) => {
        if(position === 0) {
            this.props.navigation.navigate('addTodoScreen');
        }
    }

    render() {
        return(
            <View>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="TodoList"
                    actions={[{title: 'Todo 추가하기',icon: require('../picture/long-arrow-alt-left-solid.svg')},]}
                    onActionSelected={this.onActionSelected}
                />
                {this.getTodoList().then(() => {
                    this.showTodoList();
                })}
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
