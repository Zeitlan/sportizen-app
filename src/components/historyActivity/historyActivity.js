/* eslint-disable linebreak-style */
import React from 'react'
import {View, Animated, Text, Easing, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import ListItem from './listActivity'
import { withContext } from '../../context'
import Date from './date'

@withContext(['historyActions'], ['getHistory'])
class HistoryActivity extends React.Component{

    constructor(props){
        super(props)
        this.state={
            yValue: new Animated.Value(-1000),
        }
    }

    async componentDidMount(){
        this._moveAnimation().start()
    }

    _moveAnimation = () => {
        const {actions : {getHistory}} = this.props
        Animated.timing(this.state.yValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.linear
        }).start(() => {
            getHistory().then(() => {
                const {state : {historyActions}} = this.props // get all reports
                console.log('history action is ', historyActions)
            })
        })
    }

    render(){
        const { actions: {postHistory, refreshData} } = this.props
        const {state : {historyActions}} = this.props // get all reports

        return (
            <View style={{ flex: 1, backgroundColor: '#F1F1F3'}}>
                <Animated.View style={[styles.header_title, {bottom: this.state.yValue}]}>
                    <Text style={{textAlign: 'center', fontSize: 18, color: 'white', fontWeight: '500'}}>Historique d'activité</Text>
                </Animated.View>

                <FlatList
                    style={{flex: 1}}
                    keyboardShouldPersistTaps={'always'}
                    data = {historyActions}
                    renderItem={({item, index}) => {
                        return (
                            <ListItem data={item} index={index} dateDateLength={historyActions.length}/>
                        )
                    }}
                    extraData = {this.props.state.historyActions}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
        )
    }
}

export default HistoryActivity

const styles = StyleSheet.create({
    header_title : {
        backgroundColor: '#1E90FF', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 60,
        marginBottom: 20
    },
})