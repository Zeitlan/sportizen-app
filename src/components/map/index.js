// Dependencies
import React from 'react'
import { View, StyleSheet, Text, Alert} from 'react-native'
import MapView from 'react-native-maps'
import { Polyline } from 'react-native-maps'
import { withContext } from '../../context'
import CustomMarker from './custom-marker'
import CustomPolyline from './custom-polyline'
import ReportForm from './report/report-form'
import StopActivityButton from './action-buttons/stop-activity'
import ReportButton from './action-buttons/report-button'
import MapMenu from './menu'
import bearing from '@turf/bearing'
import { point } from '@turf/helpers'

@withContext(['position', 'permissions', 'current_activity', 'reports'],['getReports', 'stopFollowingUser', 'createActivity'])
class CustomMapView extends React.Component {

    constructor(props) {
        super()
        this.onMapLongPress = this.onMapLongPress.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
        this.setUserFollow = this.setUserFollow.bind(this)
        this.zoomPath = this.zoomPath.bind(this)
        this.userFollow = this.userFollow.bind(this)
    }
    state = {
        longPressPos: undefined,
        map_view: undefined,
        user_focus: true,
        report_modal: false
    }

    componentDidMount() {
    }

    closeModal = () => {
        this.setState({report_modal: false})
    }

    onMapLongPress(e) {
        this.setState({
            longPressPos: e.nativeEvent.coordinate,
            report_modal: true
        })
    }

    onMapPress(e) {
        this.setState({user_focus: false})
        const { actions : { getReports }} = this.props
        getReports(500)
    }

    setUserFollow() {
        this.setState({ user_focus: !this.state.user_focus })
        this.userFollow(true)
    }

    userFollow(focus_changed = false){
        const { state: { position, current_activity } } = this.props
        let angle = 0
        if (((focus_changed && !this.state.user_focus) || this.state.user_focus) && current_activity.default_path !== undefined)
        {
            let point1 = point([position.coords.longitude, position.coords.latitude])
            let point2 = point([current_activity.default_path[0].longitude, current_activity.default_path[0].latitude])
            angle = bearing(point1, point2)    
        }

        this.state.map_view.animateCamera({
            center: position.coords,
            pitch: 0,
            heading: angle,
            altitude: 1000,
            zoom: 1000,
        }, 500)
    }

    zoomPath() {
        const { state: { current_activity }} = this.props

        if (this.state.map_view !== undefined && current_activity.default_path !== undefined)
        {
            this.setState({user_focus: false})
            this.state.map_view.fitToCoordinates(current_activity.default_path, 500)
        }
    }

    componentWillMount() {
        const { actions : { getReports }} = this.props
        getReports(500)
    }

    render() {
        const { state: { position, permissions, current_activity, reports }} = this.props
        const { longPressPos } = this.state
        return (
            <View style={styles.container}>
                <ReportForm modalVisible={this.state.report_modal} closeModal={this.closeModal} position={longPressPos}/>
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
                            onUserLocationChange={this.state.userFollow}
                            onPress={this.onMapPress}
                            onPanDrag={this.onMapPress}
                            onRegionChange={this.onMapPress}
                            initialRegion={{
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onLongPress = {this.onMapLongPress}
                        >
                            <CustomPolyline color={'#BF3B58'} coordinates={current_activity.default_path ? current_activity.default_path : []}/>
                            <Polyline coordinates={current_activity.user_path} strokeWidth={4} strokeColor={'#0D0D0D'}/>
                            {reports.map(report => <CustomMarker report={report} />)}
                        </MapView>
                        <StopActivityButton _onClick={() => {
                            this.props.actions.stopFollowingUser()
                            this.props.navigation.navigate('ActivitySumUp')
                        }
                        }/>
                        <ReportButton _onClick={() => this.props.navigation.navigate('ActivitySumUp')}/>
                        <MapMenu setUserFollow={this.setUserFollow} zoomPath={this.zoomPath}/>
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
    }
})