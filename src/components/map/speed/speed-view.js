// Dependencies
import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { withContext } from '../../../context'

@withContext(['position'],[])
class SpeedView extends React.Component {
    
    render() {
        const { state: {position} } = this.props
        speed = Math.round(position.coords.speed)
        speed = speed < 0 ? 0 : speed
        return (
            <View
                style={styles.container}>
                <Text style={styles.speedText}>{speed}</Text>
                <Text style={styles.annotText}>km/h</Text>
            </View>)
    }
}

export default SpeedView
    
// CSS
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    speedText: {
        color: '#F2F2F2',
        fontSize: 30,
        textAlign: 'center',
        paddingRight: 5
    },
    annotText: {
        color: '#F2F2F2',
        fontSize: 15,
        textAlign: 'center'
    }
})