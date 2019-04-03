// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import { Marker, Callout } from 'react-native-maps'

class CustomMarker extends React.Component {
    
    render() {
        const { coordinate } = this.props
        return (<Marker
            coordinate={coordinate}>
            <Image source={require('../../../assets/pin2.png')} style={styles.pinImage} />
            <Callout>
                <View style={styles.informations}>
                    <Text>Travaux</Text>
                    <Text>le 20 Mars 2019 à 21:30:20</Text>
                </View>
            </Callout>
        </Marker>)
    }
}

export default CustomMarker
    
// CSS
const styles = StyleSheet.create({
    pinImage: {
        height: 40,
        width: 40,
        top: -20
    },
    informations: {
        width: 200,
    }
})