// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Alert} from 'react-native'
import MapView from 'react-native-maps'
import { withContext } from '../../context'
import CustomMarker from './custom-marker'
import CustomPolyline from './custom-polyline'

@withContext(['position', 'permissions', 'current_activity'],['getSquarePos'])
class CustomMapView extends React.Component {

    constructor(props) {
        super()
        this.onMapClickEvent = this.onMapClickEvent.bind(this)
    }
    state = {
        poi: undefined,
        map_view: undefined
    }

    componentDidMount() {
    }

    onMapClickEvent(e) {
        const { state:{current_activity}} = this.props
        this.setState({
            poi: e.nativeEvent
        })
        if (this.state.map_view !== undefined && current_activity.default_path !== undefined)
        {
            this.state.map_view.fitToCoordinates(current_activity.default_path, 500)
        }
    }
    
    render() {
        const { state: { position, permissions, current_activity }} = this.props
        return (
            <View style={styles.container}>
                {(!permissions.location || position === undefined || position.coords === undefined) ? 
                    <Text style={styles.map}> Waiting for location</Text>
                    :
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        ref={ref=> {
                            if (this.state.map_view === undefined)
                            {
                                this.setState({map_view: ref})
                            }
                        }}
                        initialRegion={{
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onLongPress = {this.onMapClickEvent}
                    >
                        <CustomPolyline coordinates={current_activity.default_path ? current_activity.default_path : []}/>
                        {this.state.poi !== undefined && (
                            <CustomMarker
                                coordinate={this.state.poi.coordinate}>
                            </CustomMarker> )
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
    }
})