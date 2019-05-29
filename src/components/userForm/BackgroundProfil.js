/**
 * Background Image of User Profil
 */

import React from 'react'
import { ImageBackground } from 'react-native'

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