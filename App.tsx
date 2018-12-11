import React, {Component} from 'react';
import {StyleSheet, ToolbarAndroid, View} from 'react-native';
import {Drawer} from "./src/navigators/navigators";
import RootStore from "./src/store/RootStore";
import {Provider} from "mobx-react";
import {Toolbar} from 'react-native-material-ui';


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
                <Drawer />
            </Provider>
        );
    }
}

