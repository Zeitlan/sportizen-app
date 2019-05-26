/* eslint-disable linebreak-style */
/* eslint-disable semi */
import React from 'react'
import { withContext } from '../../context'
import {View} from 'react-native'
import UserInfoPart from './UserInformationPart'
import Meteo from './meteo'

export default class UserProfilPage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex : 1}}>
                <Meteo/>
                <View style={{marginTop: 5}}>
                    <UserInfoPart/>
                </View>
            </View>
        )
    }
}
