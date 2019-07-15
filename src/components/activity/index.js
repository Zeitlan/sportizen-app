// Dependencies
import React from 'react'
import MapView from 'react-native-maps'
import { Polyline } from 'react-native-maps'
import { withContext } from '../../context'
import { View, StyleSheet, Text } from 'react-native'
import ActivityChart from './activityChart'

import Swiper from 'react-native-swiper'


@withContext(['current_activity'],['updateActivityPoints', 'getActivityResume'])
class ActivitySumUp extends React.Component {
    state = {
        map_view: undefined,
        resume: undefined
    } 

    componentDidMount() {
        const { actions: { updateActivityPoints, getActivityResume } } = this.props
        updateActivityPoints().then(() => this.setState({ resume : getActivityResume()}))
    }

    render() {
        const { state: { current_activity } } = this.props
        let formattedDistance = current_activity.distance
        formattedDistance = formattedDistance.toFixed(2)
        console.log(JSON.stringify(this.state.resume))
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Résumé de votre activité</Text>
                <Swiper loadMinimal loadMinimalSize={1}>
                    <MapView
                        style={styles.map}
                        showsUserLocation={false}
                        showsMyLocationButton={false}
                        showsPointsOfInterest={false}
                        showsCompass={false}
                        showsBuildings={false}
                        showsTraffic={false}
                        showsIndoors={false}
                        zoomEnabled={false}
                        zoomTapEnabled={false}
                        rotateEnabled={false}
                        scrollEnabled={false}
                        pitchEnabled={false}
                        toolbarEnabled={false}
                        ref={ref=> {
                            if (this.state.map_view === undefined)
                            {
                                this.setState({map_view: ref})
                            }
                        }}
                        onMapReady={() => this.state.map_view.fitToCoordinates(current_activity.user_path, {
                            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
                        })}
                    >
                        <Polyline coordinates={current_activity.user_path} strokeWidth={4} strokeColor={'#0D0D0D'}/>
                    </MapView>
                    <ActivityChart/>
                </Swiper>

                <Text style={styles.title}>Vous avez parcouru {formattedDistance} kilomètre{formattedDistance > 2 ? 's' : ''}</Text>
            </View>
        )
    }
}

export default ActivitySumUp
    
// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    swiper: {
    },
    title: {
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: 300,
    }
})