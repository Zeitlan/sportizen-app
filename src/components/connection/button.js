import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const DefaultButton = (props) => {
    return (
        <TouchableOpacity style={props.button_style}>
            <Text>      
                {props.button_text}
            </Text> 
        </TouchableOpacity>
    )
}

export default DefaultButton