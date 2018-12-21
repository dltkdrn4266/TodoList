import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

export default class Loading extends React.Component {
    render() {
        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size={"small"} color={"#0000ff"}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})