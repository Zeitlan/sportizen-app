/* eslint-disable linebreak-style */
import React from 'react'
import {View, Animated, Text, Easing, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import ListItem from './listActivity'
import { withContext } from '../../context'
import Date from './date'

@withContext(['historyActions'], ['getHistory'])
export default class HistoryActivity extends React.Component{

    constructor(props){
        super(props)
        this.state={
            yValue: new Animated.Value(-1000),
            valDate: [] // tableau pour affilier une date au dernier report le plus récent
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
                this._fillIndexData(historyActions)
            })
        })
    }

    //_postaction = () => <TouchableOpacity style={{height: 50, width: '100%', backgroundColor: 'black'}} onPress={() => postHistory('bike')}></TouchableOpacity>

    _fillIndexData = (data) => { // pour affilier une date au dernier report le plus récent
        let val = []
        Array.prototype.forEach.call(data, (element, index) => {
            if (val.find((elem) => {
                return elem.date === element.created_at
            }) == undefined) // no items
            {
                val.push({indice : index, date : element.created_at})
            }
        })
        this.setState({valDate: val})
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
                            <ListItem {...item} dateData={this.state.valDate} index={index} setDateAfterRemove={(data) => this._fillIndexData(data)}/>
                        )
                    }}
                    extraData = {this.props.state.historyActions}
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
        marginBottom: 20
    },
})