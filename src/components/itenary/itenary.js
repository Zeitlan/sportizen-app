/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'
import destination from '../../../assets/itenary/destination.png'
import distance from '../../../assets/itenary/distance.png'
import AutoCompleteInput from './autocomplete'

export default class ItenaryView extends React.Component {
    render()
    {   
        return (
            <View style={{flex : 1, marginTop: 20}}>
                <View style={{paddingTop : 30, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#000000', height: 70, justifyContent: 'center'}}>
                        <Image style={styles.image} source={destination} />
                    </View>
                    <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#000000', height: 70, justifyContent: 'center', marginLeft: 8}}>
                        <Image style={styles.image} source={distance} resizeMode='contain'/>
                    </View>
                </View>
                <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, marginTop: 10, marginBottom: 15}}></View>
                <AutoCompleteInput></AutoCompleteInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,

    },
    simpleMargin:{
        marginLeft: 20
    }
})