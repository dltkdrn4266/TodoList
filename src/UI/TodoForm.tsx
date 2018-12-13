import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {todoSerializers} from "../Serializers";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

interface IProps extends todoSerializers{

}

@observer
export default class TodoForm extends React.Component<IProps,{}> {
    @observable checked: boolean = false;

    @action
    private onCheckHandler = () => {
        this.checked = !this.checked;
    }

    render() {
        return(
            <View style={styles.View}>
                <Text>{this.props.content}</Text>
                <Text>{this.props.user}</Text>
                <Text>{this.props.like}</Text>
                <Text>{this.props.createdAt}</Text>
                <Text>{this.props.completedAt}</Text>
                <Text>{this.props.isCompleted}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        flexDirection: 'column',
    },
    CheckBox: {
        width: 40,
        height: 40
    }
})