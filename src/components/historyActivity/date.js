/* eslint-disable linebreak-style */
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing} from 'react-native'

let months = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Aout', 'Septembre',
    'Octobre', 'Novembre', 'Decembre'
]

const _getDateFromDDFormat = (date, dateFilter) => {
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

    _getBackground = () => {
        const {indice_array, dateDateLength} = this.props
        if (indice_array % dateDateLength == 0){
            return {backgroundColor : '#1E90FF'}
        } // red
        else if (indice_array % dateDateLength == 1)
            return {backgroundColor: 'purple'}
        else if (indice_array % dateDateLength == 2)
            return {backgroundColor: 'red'} // yellow
        else if (indice_array % dateDateLength == 3)
            return {backgroundColor: 'green'}
        else if (indice_array % dateDateLength == 4)
            return {backgroundColor: '#D3D366'}
    }

    render(){
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: (!this.state.expanded)? ['0deg', '90deg'] : ['90deg', '0deg']
        })

        const backgroundColor = this._getBackground()
        return (
            <TouchableOpacity style={{...styles.container, ...backgroundColor}} onPress={() => {console.log(this.state.expanded); this._showSummary()}}> 
                <View style={{flexDirection: 'row', height: 40, justifyContent:'center', alignItems: 'center', flex: 1, paddingLeft: 12}}>
                    <Text style={styles.date_title}> {_getDateFromDDFormat(this.props.date, this.props.dateFilter)} </Text>
                </View>
                <View style={{alignItems: 'flex-end', width: 12, height: 12}}>
                    <Animated.Image style={{marginRight: 10, height: 12, width: 12, transform: [{rotate: spin}]}} source={require('../../../assets/history/arrow.png')}></Animated.Image>
                </View>
            </TouchableOpacity>
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