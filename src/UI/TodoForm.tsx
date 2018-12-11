import React from 'react';
import {View, Text, ToolbarAndroid, StyleSheet} from "react-native";

export default class TodoForm extends React.Component {
    render() {
        return(
            <View>
                <ToolbarAndroid
                    style={styles.toolbar}
                    logo={require('../picture/me-as-icon-with-glass-transparent.png')}
                    title="TodoList"
                />
                <Text>TodoForm</Text>
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