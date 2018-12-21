import React from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import {ITodoSerializer} from "../Serializers";
import {RootStore,IStoreInjectedProps,STORE_NAME} from "../store/rootStore";
import {inject} from "mobx-react";
import {action} from "mobx";
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from "./loading";

interface IProps extends IStoreInjectedProps{
    key: number,
    todo : ITodoSerializer;
}
interface IState{
    loading: boolean;
}


@inject(STORE_NAME)
export default class TodoItem extends React.Component<IProps,IState> {

    public readonly state: IState = {
        loading : false
    }

    constructor(props: IProps){
        super(props);
    }

    public getCreateTime = (todo: ITodoSerializer) => {
        const createDate = new Date(todo.createdAt);
        const createYear = createDate.getFullYear();
        const createMonth = createDate.getMonth();
        const createDay = createDate.getDate();
        const createHour = createDate.getHours();
        const createMinute = createDate.getMinutes();

        const tempCreateTime = createYear + '년' + createMonth + '월' + createDay + '일' +  ' ' +
            createHour + '시' + createMinute + '분';

        return tempCreateTime;
    }

    @action
    public getCompleteTime = (completeTime: string) => {
        let tempCompleteTime = '';
        if(completeTime !== null) {
            const completeDate = new Date(completeTime);
            const completeYear = completeDate.getFullYear();
            const completeMonth = completeDate.getMonth();
            const completeDay = completeDate.getDate();
            const completeHour = completeDate.getHours();
            const completeMinute = completeDate.getMinutes();

            tempCompleteTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
                completeHour + '시' + completeMinute + '분';

        }
        return tempCompleteTime;
    }

    @action
    private onPressHeartButton = async () => {
        const rootStore = this.props[STORE_NAME] as RootStore;
        try{
            this.setState({loading: true});
            const response = await rootStore.axiosStore.instance.post('/todo/' + this.props.todo.id + '/add_like/');
            const tempTodoList = [...rootStore.todoStore.todoList];
            tempTodoList.splice(tempTodoList.indexOf(this.props.todo), 1, response.data);
            rootStore.todoStore.setTodoList(tempTodoList);
        } catch (error) {
        }
        this.setState({loading: false});
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
        const rootStore = this.props[STORE_NAME] as RootStore;
        try {
            this.setState({loading: true});
            await rootStore.todoStore.deleteTodo(this.props.todo.id, this.props.todo);
        } catch (error) {
        }
        this.setState({loading: false});
    }

    @action
    private onPressCompleteButton = async () => {
        const rootStore = this.props[STORE_NAME] as RootStore;

        try {
            this.setState({loading: true});
            await rootStore.todoStore.completeTodo(this.props.todo.id, this.props.todo);
            this.getCompleteTime(this.props.todo.completedAt);
        } catch (error) {
        }
        this.setState({loading: false});
    }

    private onPressRevertButton = async() => {
        const rootStore = this.props[STORE_NAME] as RootStore;
        try{
            this.setState({loading: true});
            await rootStore.todoStore.revertTodo(this.props.todo.id, this.props.todo);
        } catch (error) {
        }
        this.setState({loading: false});
    }

    render() {
        if(this.state.loading){
            return(
                <View style={styles.rowView}>
                    <Loading/>
                </View>
            )
        }
        return(
            <View style={styles.rowView}>
                <View style={styles.columnView}>
                    <Text style={{fontSize: 20}}>{this.props.todo.content}</Text>
                    <Text>{this.getCreateTime(this.props.todo)}</Text>
                    <Text> </Text>
                    <Text>{this.props.todo.isCompleted ?
                        this.getCompleteTime(this.props.todo.completedAt) : '완료되지 않았음'}</Text>
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
        width: 410,
        height: 123,
        padding: 5,
    },
    iconButton: {
        width: 93
    },

})