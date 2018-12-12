import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {todoSerializers} from "../Serializers";
import { CheckBox } from 'react-native-elements';
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
                <CheckBox
                    title={this.props.content}
                    checked={this.checked}
                    onPress={this.onCheckHandler}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        flexDirection: 'column',
    }
})