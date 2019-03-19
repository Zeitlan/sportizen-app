// Dependencies
import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import MapView from 'react-native-maps'

class CustomMapView extends React.Component {


    state = {
        position: undefined
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ position })
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }
    
    render() {
        const { position } = this.state
        console.log(position)
        return (
            <View style={styles.container}>
                {(position === undefined || position.coords === undefined) ? 
                    <Text style={styles.map}> Waiting for location</Text>
                    :
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />}
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