import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {todoSerializers} from "../Serializers";

interface IProps{
    todoSerializers : todoSerializers;
}

export default class TodoForm extends React.Component<IProps,{}> {

    render() {
        return(
            <View style={styles.View}>
                <Text>{this.props.todoSerializers.id}</Text>
                <Text>{this.props.todoSerializers.user}</Text>
                <Text>{this.props.todoSerializers.like}</Text>
                <Text>{this.props.todoSerializers.content}</Text>
                <Text>{this.props.todoSerializers.isCompleted}</Text>
                <Text>{this.props.todoSerializers.completedAt}</Text>
                <Text>{this.props.todoSerializers.createdAt}</Text>
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