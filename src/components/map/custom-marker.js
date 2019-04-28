// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import { ReportView } from './report'

class CustomMarker extends React.Component {
    
    render() {
        const { coordinate } = this.props
        return (<Marker
            coordinate={coordinate}>
            <Image source={require('../../../assets/map/pin2.png')} style={styles.pinImage} />
            <Callout>
                <ReportView/>
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