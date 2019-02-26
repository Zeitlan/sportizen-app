import React from 'react'
import { StyleSheet, View, TouchableHighlight, TouchableNativeFeedback, Text, Platform } from 'react-native'

const styles = StyleSheet.create({
    $buttonColor: '#317af7',
    $buttonTextColor: '#ffffff',
    $buttonUnderlayColor: '#7BAAF9',
    button: {
        backgroundColor: '$buttonColor',
        paddingVertical: 20,
        paddingHorizontal: 35,
        '@media ios': {
            borderRadius: 4,
        },
        '@media android': {
            borderRadius: 1,
            elevation: 4,
        },
    },
    text: {
        color: '$buttonTextColor',
        fontSize: 15,
    },
})

export const Button = ({ text, onPress }) => {
    if (Platform.OS === 'ios') {
        return (
            <TouchableHighlight
                onPress={onPress}
                style={styles.button}
                underlayColor={styles.$buttonUnderlayColor}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableHighlight>
        )
    }

    return (

        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(styles.$buttonUnderlayColor)}
        >
            <View style={styles.button}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableNativeFeedback>
    )
};