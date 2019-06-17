/* eslint-disable linebreak-style */
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

let months = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Aout', 'Septembre',
    'Octobre', 'Novembre', 'Decembre'
]

const _getDateFromDDFormat = (date) => {
    let date_split = date.split('/')
    let date_to_display = ''
    date_split.forEach((element, index) => {
        if (index == 0) // days
            date_to_display += element + ' '
        else if (index == 1)// mois
            date_to_display += months[parseInt((element.length < 2)? element.substring(1) : element) - 1] + ' '
        else 
            date_to_display += element
    })
    return date_to_display
}


export default class Date extends React.Component{

    _getBackground = () => {
        const {indice_array, dateDateLength} = this.props
        console.log(indice_array, dateDateLength)
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
        const backgroundColor = this._getBackground()
        console.log('backcolor is', backgroundColor)
        return (
            <View style={{...styles.container, ...backgroundColor}}>
                <Text style={styles.date_title}> {_getDateFromDDFormat(this.props.date)} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40, 
        backgroundColor: '#1E90FF', 
        justifyContent:'center', 
        alignItems: 'center'
    },

    date_title: {
        textAlign: 'center',
        fontSize : 18,
        color: 'white',
    }
})