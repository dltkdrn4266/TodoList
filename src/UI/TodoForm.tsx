import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {ITodoSerializers} from "../Serializers";
import RootStore from "../store/RootStore";
import {inject, observer} from "mobx-react";
import Icon from "react-native-vector-icons/FontAwesome";
import {action, observable} from "mobx";

interface IProps{
    key: number,
    todoSerializers : ITodoSerializers;
    rootStore: RootStore;
}
@inject('rootStore')
@observer
export default class TodoForm extends React.Component<IProps,{}> {

    @observable like: number;
    public createTime: string;
    @observable public completeTime: string = '';

    constructor(props: IProps){
        super(props);
        this.like = this.props.todoSerializers.like;
        console.log('completedAt');
        console.log(this.props.todoSerializers.completedAt);

        const createDate = new Date(this.props.todoSerializers.createdAt);
        const createYear = createDate.getFullYear();
        const createMonth = createDate.getMonth();
        const createDay =  createDate.getDate();
        const createHour = createDate.getHours();
        const createMinute = createDate.getMinutes();
        this.createTime =  createYear + '년' + createMonth + '월' + createDay + '일' +  ' ' +
            createHour + '시' + createMinute + '분';
        this.setCompleteTime();
    }

    @action
    private setCompleteTime = () => {
        console.log('completedAt@');
        console.log(this.props.todoSerializers.completedAt);
        if(this.props.todoSerializers.completedAt !== null) {
            const completeDate = new Date(this.props.todoSerializers.completedAt);
            const completeYear = completeDate.getFullYear();
            const completeMonth = completeDate.getMonth();
            const completeDay = completeDate.getDate();
            const completeHour = completeDate.getHours();
            const completeMinute = completeDate.getMinutes();
            this.completeTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
                completeHour + '시' + completeMinute + '분';
        }else {
            this.completeTime = '완료되지 않았음';
        }
    }

    @action
    private onPressHeartButton = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try{
            await rootStore.axiosStore.instance.post('/todo/' + this.props.todoSerializers.id + '/add_like/')
            this.like = this.like + 1;
        } catch (error) {
            console.log(error);
        }
    }

    private onPressDeleteButton = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            await rootStore.todoStore.deleteTodo(this.props.todoSerializers.id, this.props.todoSerializers);
        } catch (error) {
            console.log(error);
        }
    }

    @action
    // 코드진짜더럽.. 가독성어디?
    private onPressCompleteButton = async () => {
        const rootStore = this.props.rootStore as RootStore;

        const completeDate = new Date();
        const completeYear = completeDate.getFullYear();
        const completeMonth = completeDate.getMonth();
        const completeDay = completeDate.getDate();
        const completeHour = completeDate.getHours();
        const completeMinute = completeDate.getMinutes();
        this.completeTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
            completeHour + '시' + completeMinute + '분';

        try {
            await rootStore.todoStore.completeTodo(this.props.todoSerializers.id);
            rootStore.todoStore.TodoList[rootStore.todoStore.TodoList.indexOf(this.props.todoSerializers)]
                .completedAt = this.completeTime;
            console.log('$$$');
            console.log(rootStore.todoStore.TodoList[rootStore.todoStore.TodoList.indexOf(this.props.todoSerializers)]
                .completedAt);
            rootStore.todoStore.TodoList[rootStore.todoStore.TodoList.indexOf(this.props.todoSerializers)]
                .isCompleted = true;
        } catch (error) {
            console.log(error);
        }
    }

    @action
    private onPressRevertButton = async() => {
        const rootStore = this.props.rootStore as RootStore;
        try{
            await rootStore.todoStore.revertTodo(this.props.todoSerializers.id);
            rootStore.todoStore.TodoList[rootStore.todoStore.TodoList.indexOf(this.props.todoSerializers)]
                .isCompleted = false;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <View style={styles.rowView}>
                <View style={styles.columnView}>
                    <Text>{this.props.todoSerializers.content}</Text>
                    <Text>{this.createTime}</Text>
                    <Text>{this.props.todoSerializers.isCompleted}</Text>
                    <Text>{this.props.todoSerializers.isCompleted ? this.completeTime : ''}</Text>
                </View>
                <View style={styles.iconButton}>
                    <Icon.Button name="heart" backgroundColor={'#f44242'} size={18} onPress={this.onPressHeartButton}>
                        <Text>{this.like}</Text>
                    </Icon.Button>
                    <Icon.Button name="trash" backgroundColor={'#2c314f'} size={22} onPress={this.onPressDeleteButton}>
                        삭제
                    </Icon.Button>
                    {this.props.todoSerializers.isCompleted ?
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
    },
    rowView : {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    CheckBox: {
        width: 40,
        height: 40
    },
    iconButton: {
        width: 'auto'
    },

})