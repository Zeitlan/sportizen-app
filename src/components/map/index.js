// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { withContext } from '../../context'
import CustomMarker from './custom-marker'

@withContext(['position', 'permissions', 'current_activity'],['watchUserPosition', 'clearUserPosition', 'requestPosPermission', 'getLoopPath', 'waitForFirstPosition'])
class CustomMapView extends React.Component {

    constructor(props) {
        super()
        this.onMapClickEvent = this.onMapClickEvent.bind(this)
    }
    state = {
        poi: undefined,
        get_path: false
    }

    componentDidMount() {
        const { actions: { requestPosPermission, watchUserPosition, getLoopPath } } = this.props
        requestPosPermission().then(() => {
            watchUserPosition()
        })
    }

    onMapClickEvent(e) {
        console.log('Click click boom')
        this.setState({
            poi: e.nativeEvent
        })
    }
    
    render() {
        const { state: { position, permissions, current_activity }, actions: {getLoopPath}} = this.props
        const {get_path} = this.state
        if (position !== undefined && !get_path) {
            this.setState({get_path: true})
            getLoopPath(500)
        }
        return (
            <View style={styles.container}>
                {(!permissions.location || position === undefined || position.coords === undefined) ? 
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
                        onLongPress = {this.onMapClickEvent}
                    >
                        <Polyline
                            coordinates={current_activity.default_path ? current_activity.default_path : []}
                            strokeWidth={1}
                        />
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