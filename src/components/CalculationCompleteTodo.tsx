import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {inject, observer} from "mobx-react";
import {IStoreInjectedProps, STORE_NAME} from "../store/rootStore";

interface IProps extends IStoreInjectedProps{
}


@inject(STORE_NAME)
@observer
export default class CalculationCompleteTodo extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const completeTodo: number = this.props[STORE_NAME]!.todoStore.todoList.filter(item => item.isCompleted === true).length;
        const allTodo: number = this.props[STORE_NAME]!.todoStore.todoList.length;
        return(
            <View style={styles.view}>
                <Text style={styles.text}>
                    {allTodo !== 0 ? (completeTodo/allTodo * 100).toFixed(1) : '0'}% 완료
                    ({`${completeTodo}/${allTodo}`});
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
})