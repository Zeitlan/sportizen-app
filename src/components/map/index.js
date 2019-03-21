// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { withContext } from '../../context'

@withContext(['position', 'logs'],['watchUserPosition', 'clearUserPosition'])
class CustomMapView extends React.Component {

    constructor(props) {
        super()
        this.onMapClickEvent = this.onMapClickEvent.bind(this)
    }
    state = {
        poi: undefined
    }
    componentDidMount() {
        const { actions: { watchUserPosition } } = this.props
        watchUserPosition()
    }

    componentWillUnmount() {
        const { actions: { clearUserPosition }} = this.props
        clearUserPosition()
    }

    onMapClickEvent(e) {
        console.log('Click click boom')
        this.setState({
            poi: e.nativeEvent
        })
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
                        onPress = {this.onMapClickEvent}
                        onPoiClick	= {this.onMapClickEvent}
                    >
                        {this.state.poi !== undefined && (
                            <Marker
                                coordinate={this.state.poi.coordinate}>
                                <Image source={require('../../../assets/pin2.png')} style={{height: 35, width:35 }} />
                                <Callout>
                                    <View style={styles.informations}>
                                        <Text>Travaux</Text>
                                        <Text>le 20 Mars 2019 à 21:30:20</Text>
                                    </View>
                                </Callout>
                            </Marker> )
                        }
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
    pinImage: {
        height: 40,
        width: 40,
        top: -20
    },
    informations: {
        width: 200,
    }
})