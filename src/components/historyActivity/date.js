/* eslint-disable linebreak-style */
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing} from 'react-native'
import ActivitySummary from './summaryActivity'
import {getBackground} from './utilities'

let months = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Aout', 'Septembre',
    'Octobre', 'Novembre', 'Decembre'
]

const _getDateFromDDFormat = (data, dateFilter) => {
    const date = data[0].created_at
    let date_split = date.split('/')
    let date_to_display = ''
    date_split.forEach((element, index) => {
        if (index == 0 && dateFilter === 'days') // days
            date_to_display += element + ' '
        else if (index == 1)// mois
            date_to_display += months[parseInt((element.length < 2)? element.substring(1) : element) - 1] + ' '
        else if (index == 2)// année
            date_to_display += element
    })
    return date_to_display
}



export default class Date extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            spinValue : new Animated.Value(0),
            expanded : false
        }
    }

    _showSummary = () => {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }
        ).start(() => {
            this.setState({expanded : (this.state.expanded)? false : true, spinValue : new Animated.Value(0)})
        })
    }

    _summary_render = () => {
        
        return (!this.state.expanded)? null : (
            <ActivitySummary {...this.props}/>
        ) 
    }


    render(){
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: (!this.state.expanded)? ['0deg', '90deg'] : ['90deg', '0deg']
        })
        const {indice_array, dateDateLength} = this.props
        const backgroundColor = getBackground(indice_array, dateDateLength)
        return (
            <View>
                <TouchableOpacity style={{...styles.container, ...backgroundColor}} onPress={() => {console.log(this.state.expanded); this._showSummary()}}> 
                    <View style={{flexDirection: 'row', height: 40, justifyContent:'center', alignItems: 'center', flex: 1, paddingLeft: 12}}>
                        <Text style={styles.date_title}> {_getDateFromDDFormat(this.props.data, this.props.dateFilter)} </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', width: 12, height: 12}}>
                        <Animated.Image style={{marginRight: 10, height: 12, width: 12, transform: [{rotate: spin}]}} source={require('../../../assets/history/arrow.png')}></Animated.Image>
                    </View>
                </TouchableOpacity>
                {this._summary_render()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40, 
        backgroundColor: '#1E90FF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' 
    },

    date_title: {
        textAlign: 'center',
        fontSize : 18,
        color: 'white',
        alignSelf: 'center'
    }
})