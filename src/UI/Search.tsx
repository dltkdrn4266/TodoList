import React from 'react';
import RootStore from "../store/RootStore";
import {TextInput, View, StyleSheet} from 'react-native';
import {inject, observer} from "mobx-react";

interface IProps {
    rootStore: RootStore;
}
@inject('rootStore')
@observer
export default class Search extends React.Component<IProps,{}> {

    constructor(props: IProps) {
        super(props);
    }

    private onChangeText = (e: string) => {
        this.props.rootStore!.searchStore.onChangeTextInput(e);
    }

    render(){
        return(
            <View>
                <TextInput
                    style={styles.TextInput}
                    placeholder='검색어를 입력해주세요'
                    onChangeText={this.onChangeText}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    TextInput: {
        borderBottomWidth: 1
    }
})