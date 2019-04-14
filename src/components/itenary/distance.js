/* eslint-disable linebreak-style */
import React from 'react'
import { View, TextInput, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'

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
            </View>
        )
    }
}