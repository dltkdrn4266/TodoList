import React from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import {ITodoSerializer} from "../Serializers";
import RootStore from "../store/rootStore";
import {inject, observer} from "mobx-react";
import {action} from "mobx";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps{
    key: number,
    todo : ITodoSerializer;
    rootStore: RootStore;
}

@inject('rootStore')
@observer
export default class TodoItem extends React.Component<IProps,{}> {

    constructor(props: IProps){
        super(props);
        this.props.rootStore.itemStore.setCreateTime(this.props.todo);
        this.props.rootStore.itemStore.setCompleteTime(this.props.todo);
    }


    @action
    private onPressHeartButton = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try{
            await rootStore.axiosStore.instance.post('/todo/' + this.props.todo.id + '/add_like/')
            rootStore.itemStore.like += 1;
        } catch (error) {
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
            console.log(error);
        }
    }

    @action
    private onPressCompleteButton = async () => {
        const rootStore = this.props.rootStore as RootStore;

        const completeDate = new Date();
        const completeYear = completeDate.getFullYear();
        const completeMonth = completeDate.getMonth();
        const completeDay = completeDate.getDate();
        const completeHour = completeDate.getHours();
        const completeMinute = completeDate.getMinutes();

        const completeTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
            completeHour + '시' + completeMinute + '분';

        try {
            await rootStore.todoStore.completeTodo(this.props.todo.id, this.props.todo);
            // rootStore.todoStore.todoList[rootStore.todoStore.todoList.indexOf(this.props.todo)]
            //     .completedAt = this.completeTime;
            const todo = this.props.todo;
            todo.completedAt = completeTime;
            this.props.todo.completedAt = todo.completedAt;
            // rootStore.todoStore.todoList[rootStore.todoStore.todoList.indexOf(this.props.todo)]
            //     .isCompleted = true;
            todo.isCompleted = true;
            this.props.todo.isCompleted = todo.isCompleted;
        } catch (error) {
            console.log(error);
        }
    }

    @action
    private onPressRevertButton = async() => {
        const rootStore = this.props.rootStore as RootStore;
        try{
            await rootStore.todoStore.revertTodo(this.props.todo.id, this.props.todo);
            // rootStore.todoStore.todoList[rootStore.todoStore.todoList.indexOf(this.props.todo)]
            //     .isCompleted = false;
            this.props.todo.isCompleted = false;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <View style={styles.rowView}>
                    <View style={styles.columnView}>
                        <Text style={{fontSize: 20}}>{this.props.todo.content}</Text>
                        <Text>{this.props.rootStore.itemStore.createTime}</Text>
                        <Text>{this.props.todo.isCompleted}</Text>
                        <Text>{this.props.todo.isCompleted ?
                            this.props.rootStore.itemStore.completeTime : ''}</Text>
                    </View>
                    <View style={styles.iconButton}>
                        <Icon.Button name="heart" backgroundColor={'#f44242'} size={18} onPress={this.onPressHeartButton}>
                            <Text>{this.props.rootStore.itemStore.like}</Text>
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