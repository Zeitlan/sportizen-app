/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text, Animated} from 'react-native'
import destination from '../../../assets/itenary/destination.png'
import distance from '../../../assets/itenary/distance.png'
import AutoCompleteInput from './autocomplete'

export default class ItenaryView extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        ).start()                        // Starts the animation
    }

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
                <Animated.View style={{opacity: this.state.fadeAnim}}>
                    <AutoCompleteInput></AutoCompleteInput>
                </Animated.View>
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