import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Switch} from "./src/navigators/navigators";

// const RootStack = createStackNavigator({
//     Home: {
//         screen: LoginScreen,
//         TodoScreen: TodoScreen
//     },
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default class App extends Component {
    render() {
        return <Switch />;
    }
}

