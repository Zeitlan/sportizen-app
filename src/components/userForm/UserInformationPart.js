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
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{width : 80, height : 80, marginTop: 100 ,backgroundColor : '#FFFFFF', borderRadius: 40, borderWidth: 2, borderColor: '#D3D3D3'}}></View>
                </View>
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