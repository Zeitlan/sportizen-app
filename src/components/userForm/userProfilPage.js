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
                <View style={{marginTop: 5, flex: 1}}>
                    <UserInfoPart/>
                    <View style={{backgroundColor: '#F1F1F3', flex: 1}}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width : 80, height : 80, marginTop: -40,backgroundColor : '#FFFFFF', borderRadius: 40, borderWidth: 2, borderColor: '#D3D3D3'}}></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
