/* eslint-disable linebreak-style */
/* eslint-disable semi */

/**
 * Background Image of User Profil
 */

import React from 'react'
import { withContext } from '../../context'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'

export default class Background extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ImageBackground source={require('../../../assets/userProfil/runningMan.jpg')} style={{height: 140, width: '100%'}}>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    userMail: {
        color: '#FFFFFF',
        fontSize: 20,
        marginBottom: 5
    }
})