/* eslint-disable linebreak-style */
import React from 'react'
import {View, Animated, Text, Easing, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import { withContext } from '../../context'
import Date from './date'

class ListItem extends React.Component{
    
    constructor(props){
        super(props)
    }

    render(){
        null
    }
}

@withContext(['historyActions'], ['getHistory'])
export default class HistoryActivity extends React.Component{

    constructor(props){
        super(props)
        this.state={
            yValue: new Animated.Value(-1000)
        }
    }

    componentDidMount(){
        this._moveAnimation()
        const {actions : {getHistory}} = this.props
        getHistory()
    }

    _moveAnimation = () => {
        Animated.timing(this.state.yValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.linear
        }).start()
    }

    //_postaction = () => <TouchableOpacity style={{height: 50, width: '100%', backgroundColor: 'black'}} onPress={() => postHistory('bike')}></TouchableOpacity>


    render(){
        const { actions: {postHistory} } = this.props
        const {state : {historyActions}} = this.props // get all reports
        console.log('history ', historyActions)
        return (
            <View style={{backgroundColor: '#F1F1F3', flex: 1}}>
                <Animated.View style={[styles.header_title, {bottom: this.state.yValue}]}>
                    <Text style={{textAlign: 'center', fontSize: 18, color: 'white', fontWeight: '500'}}>Historique d'activité</Text>
                </Animated.View>

                <FlatList 
                    keyboardShouldPersistTaps={'always'}
                    data = {historyActions}
                    renderItem={({item, index}) => {
                        return (
                            <Date date={item.created_at}/>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
        )
    }



}

const styles = StyleSheet.create({
    header_title : {
        backgroundColor: '#1E90FF', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 60, 
        marginTop: 5
    }
})