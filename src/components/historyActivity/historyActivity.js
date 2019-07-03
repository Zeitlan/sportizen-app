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
            fadeAnim: new Animated.Value(0)        
        }
    }

    async componentDidMount(){
        this._moveAnimation()
    }

    _moveAnimation = () => {
        const {actions : {getHistory}} = this.props
        getHistory().then(() => {
            Animated.timing(this.state.fadeAnim,           
                {
                    toValue: 1,                   
                    duration: 400,
                }).start()
        }).catch((error) => {
            console.log(error)
        })
    }

    render(){
        const { actions: {postHistory, refreshData} } = this.props
        const {state : {historyActions}} = this.props // get all reports

        return (
            <Animated.View style={{ flex: 1, backgroundColor: '#F1F1F3', opacity: this.state.fadeAnim, paddingBottom: 5}}>
                <FlatList
                    style={{flex: 1}}
                    keyboardShouldPersistTaps={'always'}
                    data = {historyActions}
                    renderItem={({item, index}) => {
                        return (
                            <ListItem data={item} index={index} dateDateLength={historyActions.length}/>
                        )
                    }}
                    extraData = {historyActions}
                    keyExtractor={(item, index) => item.toString()}/>
            </Animated.View>
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