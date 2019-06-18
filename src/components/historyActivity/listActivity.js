/* eslint-disable linebreak-style */

import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import Date from './date'
import Swipeout from 'react-native-swipeout'
import { withContext } from '../../context'


@withContext(['historyActions'], ['refresh_data'])
class ListItem extends React.Component{
    
    constructor(props){
        super(props)
    }

    _removeActivity(index){
        console.log('index is ', index)
        const {setDateAfterRemove} = this.props // set the date
        const {actions: {refresh_data}} = this.props // refresh the flatList in context
        const {state: {historyActions}} = this.props // get the state of All Activity to update it
        let new_array = [...historyActions]
        new_array.splice(index, 1)
        refresh_data(new_array)
        setDateAfterRemove(new_array)
    }

    _getWayTypeImage(waytype){
        if (waytype == 'bike')
            return '../../../assets/sport/bike-selected.png'
        return '../../../assets/sport/running-selected.png'
    }

    _renderDate = (date, indice_array, dateDateLength, ios_swipe_settings) => {    // indice array is used for background color for DAte
        return (
            <View style={{paddingTop: 10}}>
                <Date date={date} indice_array={indice_array} dateDateLength={dateDateLength}/>
                <Swipeout {...ios_swipe_settings} style={{height: 50, marginTop: 10}}>
                    <View style={{...styles.item_list_container}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{height: 32, width: 32}} source={require('../../../assets/sport/bike-selected.png')}></Image>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 14}}>11,10 km </Text>
                            <Text style={{color: 'gray', fontSize: 10}}> 00:45:05 </Text>
                        </View>
                        <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 15}}>
                            <TouchableOpacity onPress={() => console.log('salut')}>
                                <Image style={{width: 25, height: 25}} source={require('../../../assets/history/star.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>    
                </Swipeout>
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
        const {distance, duration, way_type, dateData, index, created_at, refreshData} = this.props
        const should_display_date = this._get_elem_in_dateArray(dateData, index)
        const ios_swipe_settings = {
            autoClose: true,
            right: [
                {
                    onPress: () => {
                        this._removeActivity(index)
                    },
                    text: 'Supprimer',
                    type: 'delete'
                },
            ],
            rowId: index
        }
        if (should_display_date != undefined)
            return this._renderDate(created_at, should_display_date, dateData.length, ios_swipe_settings)

        return (
            <Swipeout {...ios_swipe_settings} style={{height: 50}}>            
                <View style={{...styles.item_list_container}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 32, width: 32}} source={require('../../../assets/sport/bike-selected.png')}></Image>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 14}}>11,09 km </Text>
                        <Text style={{color: 'gray', fontSize: 10}}> 00:45:05 </Text>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 15}}>
                        <TouchableOpacity onPress={() => console.log('salut')}>
                            <Image style={{width: 25, height: 25}} source={require('../../../assets/history/star.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View> 
            </Swipeout>   
        )
    }    
}

export default ListItem

const styles = {
    item_list_container: {
        flexDirection: 'row',
        shadowOffset: {width: 1, height: 10},
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 1.0,
        backgroundColor: 'white',
        height: 50
    }
}