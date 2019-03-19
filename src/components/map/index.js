// Dependencies
import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import MapView from 'react-native-maps'
import { withContext } from '../../context'

@withContext(['position', 'logs'],['watchUserPosition', 'clearUserPosition'])
class CustomMapView extends React.Component {

    componentDidMount() {
        const { actions: { watchUserPosition } } = this.props
        watchUserPosition()
    }

    componentWillUnmount() {
        const { actions: { clearUserPosition }} = this.props
        clearUserPosition()
    }
    
    render() {
        const { state: {position} } = this.props
        console.log(position)
        return (
            <View style={styles.container}>
                {(position === undefined || position.coords === undefined) ? 
                    <Text style={styles.map}> Waiting for location</Text>
                    :
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                    </MapView>}
            </View>
        )
    }
}

export default CustomMapView
    
// CSS
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})