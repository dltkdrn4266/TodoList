import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ITodoSerializers} from "../Serializers";
import {observer} from "mobx-react";

interface IProps {
    todoSerializers : ITodoSerializers;
    createTime: string;
    completeTime: string;
    like: number;
    onPressHeartButton(): void;
    onPressDeleteButton(): void;
    onPressRevertButton(): void;
    onPressCompleteButton(): void;
}
@observer
export default class TodoItem extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return(
            <View style={styles.rowView}>
                <View style={styles.columnView}>
                    <Text style={{fontSize: 20}}>{this.props.todoSerializers.content}</Text>
                    <Text>{this.props.createTime}</Text>
                    <Text>{this.props.todoSerializers.isCompleted}</Text>
                    <Text>{this.props.todoSerializers.isCompleted ? this.props.completeTime : ''}</Text>
                </View>
                <View style={styles.iconButton}>
                    <Icon.Button name="heart" backgroundColor={'#f44242'} size={18} onPress={this.props.onPressHeartButton}>
                        <Text>{this.props.like}</Text>
                    </Icon.Button>
                    <Icon.Button name="trash" backgroundColor={'#2c314f'} size={22} onPress={this.props.onPressDeleteButton}>
                        삭제
                    </Icon.Button>
                    {this.props.todoSerializers.isCompleted ?
                        <Icon.Button name="rotate-left" backgroundColor={'#007AFF'} size={20} onPress={this.props.onPressRevertButton}>
                            되돌리기
                        </Icon.Button>:
                        <Icon.Button name="check" backgroundColor={'#007AFF'} size={20} onPress={this.props.onPressCompleteButton}>
                            완료
                        </Icon.Button>}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    columnView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    rowView : {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    iconButton: {
        width: 93
    },

})