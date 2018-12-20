import React from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import {ITodoSerializer} from "../Serializers";
import RootStore from "../store/rootStore";
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps{
    key: number,
    todo : ITodoSerializer;
    rootStore: RootStore;
}

@inject('rootStore')
@observer
export default class TodoItem extends React.Component<IProps,{}> {

    public createTime: string = '';
    @observable public completeTime: string = '';

    constructor(props: IProps){
        super(props);
        this.setCreateTime(this.props.todo);
        this.setCompleteTime(this.props.todo);
    }

    public setCreateTime = (todo: ITodoSerializer) => {
        const createDate = new Date(todo.createdAt);
        const createYear = createDate.getFullYear();
        const createMonth = createDate.getMonth();
        const createDay = createDate.getDate();
        const createHour = createDate.getHours();
        const createMinute = createDate.getMinutes();

        const tempCreateTime = createYear + '년' + createMonth + '월' + createDay + '일' +  ' ' +
            createHour + '시' + createMinute + '분';

        this.createTime = tempCreateTime;
    }

    @action
    public setCompleteTime = (todo: ITodoSerializer) => {
        let tempCompleteTime = '';
        if(todo.completedAt !== null) {
            const completeDate = new Date(todo.completedAt);
            const completeYear = completeDate.getFullYear();
            const completeMonth = completeDate.getMonth();
            const completeDay = completeDate.getDate();
            const completeHour = completeDate.getHours();
            const completeMinute = completeDate.getMinutes();

            tempCompleteTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
                completeHour + '시' + completeMinute + '분';

        }
        this.completeTime = tempCompleteTime;
    }


    private onPressHeartButton = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try{
            const response = await rootStore.axiosStore.instance.post('/todo/' + this.props.todo.id + '/add_like/');
            const tempTodoList = [...rootStore.todoStore.todoList];
            tempTodoList.splice(tempTodoList.indexOf(this.props.todo), 1, response.data);
            rootStore.todoStore.todoList = tempTodoList;
        } catch (error) {
            console.log('TodoItem onPressHeartButton');
            console.log(error);
        }
    }

    private onPressShowModalButton = () => {
        Alert.alert(
            '경고',
            '정말 Todo를 삭제하시겠습니까?',
            [
                {text: 'OK', onPress: this.onPressDeleteButton },
                {text: 'Cancel'}
            ]
        )
    }

    private onPressDeleteButton = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            await rootStore.todoStore.deleteTodo(this.props.todo.id, this.props.todo);
        } catch (error) {
            console.log('TodoItem onPressDeleteButton');
            console.log(error);
        }
    }


    private onPressCompleteButton = async () => {
        const rootStore = this.props.rootStore as RootStore;

        const completeDate = new Date();
        const completeYear = completeDate.getFullYear();
        const completeMonth = completeDate.getMonth();
        const completeDay = completeDate.getDate();
        const completeHour = completeDate.getHours();
        const completeMinute = completeDate.getMinutes();

        const tempCompleteTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
            completeHour + '시' + completeMinute + '분';

        try {
            await rootStore.todoStore.completeTodo(this.props.todo.id, this.props.todo);
            this.completeTime = tempCompleteTime;
        } catch (error) {
            console.log('TodoItem onPressCompleteButton');
            console.log(error);
        }
    }

    private onPressRevertButton = async() => {
        const rootStore = this.props.rootStore as RootStore;
        try{
            await rootStore.todoStore.revertTodo(this.props.todo.id, this.props.todo);
        } catch (error) {
            console.log('TodoItem onPressRevertButton');
            console.log(error);
        }
    }

    render() {
        return(
            <View style={styles.rowView}>
                <View style={styles.columnView}>
                    <Text style={{fontSize: 20}}>{this.props.todo.content}</Text>
                    <Text>{this.createTime}</Text>
                    <Text> </Text>
                    <Text>{this.props.todo.isCompleted ?
                        this.completeTime : '완료되지 않았음'}</Text>
                </View>
                <View style={styles.iconButton}>
                    <Icon.Button name="heart" backgroundColor={'#f44242'} size={18} onPress={this.onPressHeartButton}>
                        <Text>{this.props.todo.like}</Text>
                    </Icon.Button>
                    <Icon.Button name="trash" backgroundColor={'#2c314f'} size={22} onPress={this.onPressShowModalButton}>
                        삭제
                    </Icon.Button>
                    {this.props.todo.isCompleted ?
                        <Icon.Button name="rotate-left" backgroundColor={'#007AFF'} size={20} onPress={this.onPressRevertButton}>
                            되돌리기
                        </Icon.Button>:
                        <Icon.Button name="check" backgroundColor={'#007AFF'} size={20} onPress={this.onPressCompleteButton}>
                            완료
                        </Icon.Button>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    columnView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rowView : {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#47315a',
        borderBottomWidth: 1,
        padding: 5
    },
    checkBox: {
        width: 40,
        height: 40
    },
    iconButton: {
        width: 93
    },

})