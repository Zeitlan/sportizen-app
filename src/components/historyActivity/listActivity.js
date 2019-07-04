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

    _removeActivity(index_item){ // index of the activty in the array we want to delete
        const {index} = this.props // index of the array in the main array
        const {actions: {refresh_data}} = this.props // refresh the flatList in context
        const {state: {historyActions}} = this.props // get the state of All Activity to update it
        let new_array = [...historyActions]
        new_array[index].splice(index_item, 1)
        if (new_array[index].length == 0)
            new_array.splice(index, 1)
        refresh_data(new_array)
    }

    _getWayTypeImage(waytype){
        if (waytype == 'bike')
            return '../../../assets/sport/bike-selected.png'
        return '../../../assets/sport/running-selected.png'
    }

    _renderItem = (data, index) => {
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

        return (
            <Swipeout key={data.toString() + index.toString()} {...ios_swipe_settings} style={(index == 0)? {height: 50, marginTop: 10} : {height : 50}}>            
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
            </Swipeout>)
    }
    
    render(){
        const {data, index, dateDateLength}= this.props

        return (
            <View style={{paddingTop: 10}}>
                <Date date={data[0].created_at} indice_array={index} dateDateLength={dateDateLength}/>
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