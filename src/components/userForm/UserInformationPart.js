/* eslint-disable linebreak-style */
/* eslint-disable semi */

/**
 * reprensent the view with the profil logo of the user, the settting part... on user profil page
 */

import React from 'react'
import { withContext } from '../../context'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'

export default class UserInfoPart extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ImageBackground source={require('../../../assets/userProfil/Running.png')} style={{height: 140, width: '100%'}}>
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