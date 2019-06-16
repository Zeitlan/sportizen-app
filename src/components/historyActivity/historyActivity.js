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

    render(){
        console.log(this.props)
        const {distance, duration, way_type} = this.props
        console.log(distance, duration, way_type)
        return (
            <View style={styles.item_list_container}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{height: 64, width: 64}} source={require('../../../assets/sport/bike-selected.png')}></Image>
                    <Text style={{textAlign: 'center'}}> 300m </Text>
                </View>
                <View style={{flex: 3, alignItems: 'center'}}>
                    <View style={{justifyContent: 'flex-start', paddingTop: 5}}>
                        <View style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
                            <Image style={{resizeMode: 'contain', width: 32, height: 32}} source={require('../../../assets/history/clock.png')}></Image>
                            <Text style={{fontSize: 16, paddingLeft: 8}}>3h45m</Text>
                        </View>
                        <View style={{borderBottomColor: '#C0C0C0', borderBottomWidth: 1, width: 120}}/>
                        <View style={{height: 50, alignItems: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <Image style={{width: 32, height: 32}} source={require('../../../assets/userProfil/star.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 20}}>
                                <Image style={{width: 32, height: 32}} source={require('../../../assets/history/map.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                            <View style={{paddingTop: 5, paddingBottom: 5}}>
                                <Date date={item.created_at}/>
                                <ListItem {...item}/>
                            </View>
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
    },

    item_list_container: {
        flexDirection: 'row',
        borderRadius: 20,
        margin: 20,
        marginRight: 40,
        marginLeft: 40,
        shadowOffset: {width: 1, height: 10},
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 10,
        shadowOpacity: 1.0,
        backgroundColor: 'white',
        height: 125
    }
})