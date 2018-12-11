import React from 'react';
import {View, Text, ToastAndroid, AsyncStorage, ToolbarAndroid, StyleSheet} from 'react-native'
import RootStore from '../store/RootStore';
import {inject} from "mobx-react";
import {AxiosResponse, AxiosError} from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

type props = {
    rootStore: RootStore;
}
@inject('rootStore')
export default class TodoList extends React.Component {

    constructor(props: props) {
        super(props);
        const rootStore = this.props.rootStore as RootStore;
        rootStore.axiosStore.changeInstance().then(() => {
            this.getTodoList();
        });
    }

    public getTodoList = () => {
        const rootStore = this.props.rootStore as RootStore;
        rootStore.axiosStore.instance.get('/todo/')
            .then((response: AxiosResponse) => {
                console.log(response);
                ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
                rootStore.todoStore.setTodoList(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
                ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
            })
    }

    render() {
        return(
            <View>
                <ToolbarAndroid
                    style={styles.toolbar}
                    logo={require('../picture/me-as-icon-with-glass-transparent.png')}
                    title="TodoList"
                    actions={[{title: 'goBack',icon: require('')}]}
                />
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
