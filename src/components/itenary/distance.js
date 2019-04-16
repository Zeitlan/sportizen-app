/* eslint-disable linebreak-style */
import React from 'react'
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

export default class DistanceInput extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            km: undefined
        }

    }

    render()
    {
        return(
            <View>
                <View style={{marginLeft: 10, marginRight: 10, marginTop: 12, backgroundColor: '#E8E8E8'}}> 
                    <TextInput
                        style={{textAlign: 'center', fontSize: 18}}
                        placeholder = "Choisissez une distance à parcourir (km)"
                        onChangeText={(text) => this.setState({km : text})}
                        maxLength={4}
                        value={this.state.textArrivee}
                        keyboardType='numeric' />
                </View>

                <TouchableOpacity style={{marginTop: 10}}>
                    <View style={styles.button_validation}>
                        <Image style={{width: 15, height: 15}} source={require('../../../assets/itenary/search.png')}></Image>
                        <Text style={{marginLeft: 8}}>Rechercher</Text>
                    </View>
                </TouchableOpacity>        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button_validation: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 20,
        marginTop: 12, 
        marginLeft: 50, 
        marginRight: 50, 
        backgroundColor: '#D8D8D8', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})