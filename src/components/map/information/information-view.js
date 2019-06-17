// Dependencies
import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { withContext } from '../../../context'

@withContext(['position', 'current_activity'],[])
class InformationsView extends React.Component {
    
    render() {
        const { state: {position, current_activity: { distance }} } = this.props
        speed = Math.round(position.coords.speed)
        speed = speed < 0 ? 0 : speed
        let formattedDistance = distance
        formattedDistance = formattedDistance.toFixed(2)
        return (
            <View
                style={styles.container}>
                <Text style={styles.speedText}>{formattedDistance}</Text>
                <Text style={styles.annotText}>km</Text>
            </View>)
    }
}

export default InformationsView
    
// CSS
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    speedText: {
        color: '#00AEEF',
        fontSize: 30,
        textAlign: 'center',
        paddingRight: 5
    },
    annotText: {
        color: '#00AEEF',
        fontSize: 15,
        textAlign: 'center'
    }
})