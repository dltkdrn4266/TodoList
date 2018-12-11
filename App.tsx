import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Switch} from "./src/navigators/navigators";
import RootStore from "./src/store/RootStore";
import {Provider} from "mobx-react";

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
        const rootStore = new RootStore();
        return (
            <Provider rootStore={rootStore}>
                <Switch />
            </Provider>
        );
    }
}

