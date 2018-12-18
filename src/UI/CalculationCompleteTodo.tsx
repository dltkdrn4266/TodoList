import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {inject, observer} from "mobx-react";
import RootStore from "../store/RootStore";

interface IProps {
    rootStore: RootStore;
}

@inject('rootStore')
@observer
export default class CalculationCompleteTodo extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }


    render() {
        return(
            <View style={styles.view}>
                <Text style={styles.text}>
                    {
                        (this.props.rootStore.calculationTodoStore.completeTodo/
                            this.props.rootStore.calculationTodoStore.allTodo) * 100 &&
                        ((this.props.rootStore.calculationTodoStore.completeTodo/
                            this.props.rootStore.calculationTodoStore.allTodo) * 100) !== Infinity ?
                        ((this.props.rootStore.calculationTodoStore.completeTodo/
                            this.props.rootStore.calculationTodoStore.allTodo) * 100).toFixed(1) : 0
                    }% 완료
                    ({this.props.rootStore.calculationTodoStore.completeTodo}/
                    {this.props.rootStore.calculationTodoStore.allTodo})
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