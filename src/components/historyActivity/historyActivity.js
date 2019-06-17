/* eslint-disable linebreak-style */
import React from 'react'
import {View, Animated, Text, Easing, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native'
import { withContext } from '../../context'
import Date from './date'

class ListItem extends React.Component{
    
    constructor(props){
        super(props)
    }

    _getWayTypeImage(waytype){
        if (waytype == 'bike')
            return '../../../assets/sport/bike-selected.png'
        return '../../../assets/sport/running-selected.png'
    }

    _renderDate = (date, indice_array, dateDateLength) => {    // indice array is used for background color for DAte
        return (
            <View style={{paddingTop: 10}}>
                <Date date={date} indice_array={indice_array} dateDateLength={dateDateLength}/>
                <View style={{...styles.item_list_container, marginTop: 10}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 32, width: 32}} source={require('../../../assets/sport/bike-selected.png')}></Image>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 14}}>11,10 km </Text>
                        <Text style={{color: 'gray', fontSize: 10}}> 00:45:05 </Text>
                    </View>
                </View>    
            </View>     
        )   
    }

    _get_elem_in_dateArray = (dateData, index) => {
       for (let i = 0; i < dateData.length; i++){
            const elem = dateData[i]
            if (elem.indice === index)
                return i // return pos in array (used for background color for Date)
       }
       return undefined
    }

    render(){
        const {distance, duration, way_type, dateData, index, created_at} = this.props
        const should_display_date = this._get_elem_in_dateArray(dateData, index)
        if (should_display_date != undefined)
            return this._renderDate(created_at, should_display_date, dateData.length)

        return (
            <View style={{...styles.item_list_container, marginTop: 5}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 32, width: 32}} source={require('../../../assets/sport/bike-selected.png')}></Image>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 14}}>11,09 km </Text>
                        <Text style={{color: 'gray', fontSize: 10}}> 00:45:05 </Text>
                    </View>
            </View>    
        )
    }    
}

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
        this._moveAnimation()
        const {actions : {getHistory}} = this.props
        getHistory().then(() => {
            const {state : {historyActions}} = this.props // get all reports
            this._fillIndexData(historyActions)
        })
    }

    _moveAnimation = () => {
        Animated.timing(this.state.yValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.linear
        }).start()
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
        const { actions: {postHistory} } = this.props
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
                            <ListItem {...item} dateData={this.state.valDate} index={index}/>
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
        marginBottom: 20
    },

    item_list_container: {
        flexDirection: 'row',
        shadowOffset: {width: 1, height: 10},
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 10,
        shadowOpacity: 1.0,
        backgroundColor: 'white',
        height: 50
    }
})