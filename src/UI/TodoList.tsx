import React from 'react';
import {View,Text} from 'react-native'

export default class TodoList extends React.Component {
    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>TodoList Screen</Text>
            </View>
        )
    }
}
