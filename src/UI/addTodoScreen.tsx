import React from 'react';
import {View, Text, TextInput,StyleSheet} from "react-native";
import {Button} from "react-native-material-ui";

export default class addTodoScreen extends React.Component {
    render() {
        return(
            <View style={style.View}>
                <TextInput style={style.TextInput} placeholder={'Todo 입력'}/>
                <Button text={"작성하기"}/>
            </View>
        )
    }
}


const style = StyleSheet.create({
    View: {
        flex: 1
    },
    TextInput: {
    }
})