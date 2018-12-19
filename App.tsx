import React, {Component} from 'react';
import {StyleSheet, ToolbarAndroid, View} from 'react-native';
import {Stack} from "./src/navigators/navigators";
import RootStore from "./src/store/rootStore";
import {Provider} from "mobx-react";

const rootStore = new RootStore();

export default class App extends Component {


    render() {
        return (
            <Provider rootStore={rootStore}>
                <Stack />
            </Provider>
        );
    }
}

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

