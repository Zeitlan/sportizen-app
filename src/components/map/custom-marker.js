// Dependencies
import React from 'react'
import { Platform, StyleSheet, Text, Image} from 'react-native'
import { Marker, Callout } from 'react-native-maps'
import ReportView from './report/report-view'

class CustomMarker extends React.Component {
    
    render() {
        const { coordinate } = this.props
        return (<Marker
            coordinate={coordinate}
            style={styles.maker}>
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
        top: Platform.OS === 'ios' ? -20 : 0,
    },
    informations: {
        width: 200,
    }
})