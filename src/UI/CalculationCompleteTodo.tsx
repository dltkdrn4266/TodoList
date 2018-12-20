import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {inject, observer} from "mobx-react";
import RootStore from "../store/rootStore";
import calculationTodoStore from "../store/calculationTodoStore";

interface IProps {
    rootStore: RootStore;
}

@inject('rootStore')
@observer
export default class CalculationCompleteTodo extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }

    private percentCalculationFunc = () => {
        const calTodoStore = this.props.rootStore.calculationTodoStore as calculationTodoStore;
        let percent: string = '0';
        if(calTodoStore.completeTodo/calTodoStore.allTodo && calTodoStore.completeTodo/calTodoStore.allTodo !== Infinity) {
            percent = ((calTodoStore.completeTodo/calTodoStore.allTodo) * 100).toFixed(1);
        }
        return percent;
    }

    render() {
        return(
            <View style={styles.view}>
                <Text style={styles.text}>
                    {this.percentCalculationFunc()}% 완료
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