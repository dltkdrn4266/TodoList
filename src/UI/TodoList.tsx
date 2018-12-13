import React from 'react';
import {View, Text, ToastAndroid, AsyncStorage, ToolbarAndroid, StyleSheet} from 'react-native'
import RootStore from '../store/RootStore';
import {inject} from "mobx-react";
import {AxiosResponse, AxiosError} from "axios";
import TodoForm from "./TodoForm";
import {action, observable} from "mobx";
import {NavigationProp} from "react-navigation";

type IProps = {
    rootStore: RootStore;
    // navigation: NavigationProp<???>;
}
@inject('rootStore')
export default class TodoList extends React.Component<IProps,{}> {

    @observable protected todoList: any = [];

    constructor(props: IProps) {
        super(props);
        this.todoList = [<View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                            <Text>빈값이네요 ㅠㅠ</Text>
                         </View>]
    }

    public async componentDidMount() {
        console.log('componentDidMount in');
        await this.getTodoList();
        this.setTodoView();
        console.log(this.todoList);
        console.log('componentDidMount out');
    }

    @action
    public setTodoView = () => {
        console.log('setTodoView in');
        const rootStore = this.props.rootStore as RootStore;
        console.log('안녕 밑에있는건 rootStore.todoStore.TodoList야!')
        console.log(rootStore.todoStore.TodoList);
        console.log('잘가');
        for(const todoId in rootStore.todoStore.TodoList) {
            console.log('for in');
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

                this.todoList.push(<TodoForm
                    key={rootStore.todoStore.TodoList[todoId].id}
                    id={rootStore.todoStore.TodoList[todoId].id}
                    user={rootStore.todoStore.TodoList[todoId].user}
                    content={rootStore.todoStore.TodoList[todoId].content}
                    createdAt={createdYear + '/' + createdMonth + '/' + createdDay + '   ' + createdHour + '시' + createdMinutes + '분'}
                    like={rootStore.todoStore.TodoList[todoId].like}
                    isCompleted={rootStore.todoStore.TodoList[todoId].isCompleted}
                    completedAt={rootStore.todoStore.TodoList[todoId].completedAt ? completedAt : ''}
                />)

                this.todoList.map((todoId: any) => {

                });
            }
        }
        console.log('setTodoView Out');
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
                rootStore.todoStore.setTodoList(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
                ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
            })
        console.log('getTodoList Out');
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
                {console.log('TodoLIST!!!!!')}
                {/*{this.todoList}*/}
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
