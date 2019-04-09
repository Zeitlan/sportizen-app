// Dependencies
import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import MapView from 'react-native-maps'
import { withContext } from '../../context'
import CustomMarker from './custom-marker'
import CustomPolyline from './custom-polyline'

@withContext(['position', 'permissions', 'current_activity'],['getSquarePos'])
class CustomMapView extends React.Component {

    constructor(props) {
        super()
        this.onMapLongPress = this.onMapLongPress.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
        this.setUserFollow = this.setUserFollow.bind(this)
        this.zoomPath = this.zoomPath.bind(this)
    }
    state = {
        poi: undefined,
        map_view: undefined,
        user_focus: true,
        buttons: {
            user: require('../../../assets/map/cursor.png'),
            path: require('../../../assets/map/map.png')
        }
    }

    componentDidMount() {
    }

    onMapLongPress(e) {
        this.setState({
            poi: e.nativeEvent
        })
    }

    onMapPress(e) {
        this.setState({user_focus: false})
    }

    setUserFollow() {
        const { state: { position }} = this.props
        this.setState({user_focus: !this.state.user_focus})

        if (this.state.map_view !== undefined && position.coords !== undefined)
        {
            this.state.map_view.animateToCoordinate(position.coords, 500)
        }
    }

    zoomPath() {
        const { state: { current_activity }} = this.props

        if (this.state.map_view !== undefined && current_activity.default_path !== undefined)
        {
            this.setState({user_focus: false})
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
                    <View style={styles.container}>
                        <MapView
                            style={styles.map}
                            showsUserLocation={true}
                            ref={ref=> {
                                if (this.state.map_view === undefined)
                                {
                                    this.setState({map_view: ref})
                                }
                            }}
                            followsUserLocation={this.state.user_focus} 
                            onPress={this.onMapPress}
                            initialRegion={{
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onLongPress = {this.onMapLongPress}
                        >
                            <CustomPolyline coordinates={current_activity.default_path ? current_activity.default_path : []}/>
                            {this.state.poi !== undefined && (
                                <CustomMarker
                                    coordinate={this.state.poi.coordinate}>
                                </CustomMarker> )
                            }
                        </MapView>
                        <View
                            style={{
                                position: 'absolute',//use absolute position to show button on top of the map
                                top: '5%',
                                alignSelf: 'flex-end',
                                paddingRight: 10
                            }}>

                            <TouchableOpacity onPress={this.setUserFollow} underlayColor="white" style={styles.sportElm}>
                                <Image style={styles.sportImg} source={this.state.buttons.user} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.zoomPath} underlayColor="white" style={styles.sportElm}>
                                <Image style={styles.sportImg} source={this.state.buttons.path} />
                            </TouchableOpacity>
                        </View>
                    </View>}
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
    sportElm: {
        margin: 5,
        height:30,
        width: 30,
        marginTop: 10,
    },
    sportImg: {
        flex: 1,
        height:30,
        width: 30,
        resizeMode: 'contain',
    }
})