/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'
import destination from '../../../assets/itenary/destination.png'
import distance from '../../../assets/itenary/distance.png'

export default class ItenaryView extends React.Component {
    render()
    {   
        return (
            <View style={{flex : 1, marginTop: 20}}>
                <View style={{paddingTop : 30, flexDirection: 'row', justifyContent: 'center'}}>
                    <Image style={styles.image} source={destination} />
                    <Image style={[styles.image, styles.simpleMargin]} source={distance} resizeMode='contain'/>
                </View>
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