import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const DefaultButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.button_style}>
            <Text style={props.text_style}>      
                {props.button_text}
            </Text> 
        </TouchableOpacity>
    )
}

export default DefaultButton