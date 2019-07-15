/* eslint-disable linebreak-style */

import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import Date from './date'
import Swipeout from 'react-native-swipeout'
import { withContext } from '../../context'
import bikeselected from '../../../assets/sport/bike-selected.png'
import runningselected from '../../../assets/sport/running-selected.png'
import {_distance_converter_to_format, _time_converter_to_sec, _convert_second_to_format, _convert_m_sec_to_km_h_format} from './utilities'

@withContext(['historyActions'], ['refresh_data', 'deleteHistory'])
class ListItem extends React.Component{
    
    constructor(props){
        super(props)
    }

    _removeActivity(index_item, data){ // index of the activty in the array we want to delete, data is the element data
        const {index} = this.props // index of the array in the main array
        const {actions: {refresh_data, deleteHistory}} = this.props // refresh the flatList in context
        const {state: {historyActions}} = this.props // get the state of All Activity to update it
        const activity_id = data.id
        let new_array = [...historyActions]
        new_array[index].splice(index_item, 1)
        if (new_array[index].length == 0)
            new_array.splice(index, 1)
        refresh_data(new_array)
        deleteHistory(activity_id) // remove from db
    }

    _getWayTypeImage(waytype){
        if (waytype == 'cycling-road')
            return bikeselected
        return runningselected
    }

    _renderItem = (data, index) => {
        const ios_swipe_settings = {
            autoClose: true,
            right: [
                {
                    onPress: () => {
                        this._removeActivity(index, data)
                    },
                    text: 'Supprimer',
                    type: 'delete'
                },
            ],
            rowId: index
        }

        const sport_image = this._getWayTypeImage(data.way_type)

        return (
            <Swipeout key={data.toString() + index.toString()} {...ios_swipe_settings} style={(index == 0)? {height: 50, marginTop: 10} : {height : 50}}>            
                <View style={{...styles.item_list_container}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{height: 32, width: 32}} source={sport_image}></Image>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{color: 'black', fontSize: 14}}> {_distance_converter_to_format(data.distance)} Km</Text>
                        <Text style={{color: 'gray', fontSize: 10}}> { _convert_second_to_format(_time_converter_to_sec(data.duration))}</Text>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-end', paddingEnd: 15}}>
                        <TouchableOpacity onPress={() => console.log('salut')}>
                            <Image style={{width: 25, height: 25}} source={require('../../../assets/history/star.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View> 
            </Swipeout>)
    }
    
    render(){
        const {data, index, dateDateLength}= this.props

        return (
            <View style={{paddingTop: 10}}>
                <Date data={data} indice_array={index} dateDateLength={dateDateLength} dateFilter={this.props.dateFilter}/>
                {data.map((item, index_item) => this._renderItem(item, index_item))} 
            </View>     
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