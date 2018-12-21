import React, {Component} from 'react';
import {RootStack} from "./src/navigators/navigators";
import {RootStore} from "./src/store/rootStore";
import {Provider} from "mobx-react";

const store = new RootStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        );
    }
}
