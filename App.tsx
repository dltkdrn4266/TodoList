import React, {Component} from 'react';
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
