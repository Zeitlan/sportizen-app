/* eslint-disable linebreak-style */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text, Animated, TouchableOpacity} from 'react-native'
import destination from '../../../assets/itenary/destination.png'
import destination_selected from '../../../assets/itenary/destination_selected.png'
import distance from '../../../assets/itenary/distance.png'
import distance_selected from '../../../assets/itenary/distance_selected.png'
import AutoCompleteInput from './autocomplete'

export default class ItenaryView extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            selected_mode : undefined, // selected mode: 1 = adress, selected mode: 2 = distance
            fadeAnim: new Animated.Value(0)
        }
        this.Render_page = this.Render_page.bind(this)
    }

    launch_animation(){
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 700,              // Make it take a while
            }
        ).start()                        // Starts the animation
    }

    Render_page() {
        console.log(this.state.selected_mode)
        if (this.state.selected_mode == undefined)
        {
            return (
                <View style={{flex : 1, marginTop: 20}}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Choisissez un mode</Text>
                    <View style={{marginTop : 30, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {this.setState({selected_mode : 1}), this.launch_animation()}}>
                            <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#000000', height: 70, justifyContent: 'center'}}>
                                <Image style={styles.image} source={destination} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setState({selected_mode : 2})}}>
                            <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#000000', height: 70, justifyContent: 'center', marginLeft: 8}}>
                                <Image style={styles.image} source={distance} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, marginTop: 10, marginBottom: 15}}></View>
                </View>
            )
        }

        else if (this.state.selected_mode == 1) // adress
        {
            return (
                <View style={{flex : 1, marginTop: 20}}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Choisissez un mode</Text>
                    <View style={{marginTop : 30, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {this.setState({selected_mode : 1})}}>
                            <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#02a0e1', height: 70, justifyContent: 'center'}}>
                                <Image style={styles.image} source={destination_selected} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setState({selected_mode : 2})}}>
                            <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#000000', height: 70, justifyContent: 'center', marginLeft: 8}}>
                                <Image style={styles.image} source={distance} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderBottomColor:'#D3D3D3', borderBottomWidth: 1, marginTop: 10, marginBottom: 15}}></View>
                    <Animated.View style={{opacity: this.state.fadeAnim}}>
                        <AutoCompleteInput></AutoCompleteInput>
                    </Animated.View>
                </View>
            )
        }
        return <Text> test </Text>
    }

    render()
    {   
        console.log(this.state)
        return (
            <this.Render_page/>
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