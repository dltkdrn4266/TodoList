import React from 'react';
import {View, ToolbarAndroid, StyleSheet, ScrollView, AsyncStorage} from 'react-native'
import {IStoreInjectedProps, STORE_NAME} from '../store/rootStore';
import {inject, observer} from "mobx-react";
import TodoItem from "../components/TodoItem";
import {NavigationScreenProp} from "react-navigation";
import Search from "../components/Search";
import CalculationCompleteTodo from "../components/CalculationCompleteTodo";

interface IProps extends IStoreInjectedProps{
    navigation: NavigationScreenProp<{}>;
}
@inject(STORE_NAME)
@observer
export default class TodoList extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }

    public async componentDidMount() {
        await this.props[STORE_NAME]!.todoStore.getTodoList();
    }

    private onActionSelected = async(position: number) => {
        if(position === 0) {
            this.props.navigation.navigate('TodoFormScreen');
        }else if(position === 1){
            await AsyncStorage.removeItem('authToken');
            this.props.navigation.navigate('LoginScreen');
        }
    }

    render() {
        return(
            <ScrollView style={styles.scrollView}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="TodoList"
                    actions={[{title: 'Todo 추가하기'},{title: '로그아웃'}]}
                    onActionSelected={this.onActionSelected}
                />
                <CalculationCompleteTodo/>
                <Search/>
                <View>
                    {this.props[STORE_NAME]!.todoStore.todoList.map((item) => (
                        this.props[STORE_NAME]!.searchStore.searchWords !== '' ?
                            item.content.search(this.props[STORE_NAME]!.searchStore.searchWords) >= 0 ?
                                <TodoItem key={item.id} todo={item} /> :
                                null :
                            <TodoItem key={item.id} todo={item} />
                    ))}
                </View>
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
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
})
