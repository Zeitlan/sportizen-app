// Dependencies
import React from 'react'
import MapView from 'react-native-maps'
import { Polyline } from 'react-native-maps'
import { withContext } from '../../context'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import ActivityChart from './activityChart'
import running from '../../../assets/sport/running.png'
import bike from '../../../assets/sport/bike.png'
import favorite from '../../../assets/history/like.png'
import favorite_not_selected from '../../../assets/history/like_unselected.png'
import Svg, { Use ,Image as ImageSVG} from 'react-native-svg'

@withContext(['current_activity'],['updateActivityPoints', 'getActivityResume'])
class ActivitySumUp extends React.Component {
    state = {
        map_view: undefined,
        _favorite: false,
        resume: {
            distanceGlobal: 0,
            graph: []
        },
    } 

    componentDidMount() {
        const { actions: { updateActivityPoints, getActivityResume } } = this.props
        updateActivityPoints().then(() => getActivityResume().then((resume => this.setState({resume}))))
    }

    render() {
        const { state: { current_activity } } = this.props
        let formattedDistance = current_activity.distance
        formattedDistance = formattedDistance.toFixed(2)
        return (
            <View style={styles.container}>

                <View style={styles.subcontainer}>
                    <ActivityChart data={this.state.resume ? this.state.resume : []}/>
                </View>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>Details</Text>
                    <View style={styles.details}>
                        <View>
                            <Text style={styles.informations}>Distance</Text>
                            <Text style={styles.informations}>{formattedDistance}</Text>
                        </View>
                        <View>
                            <Text style={styles.informations}>Speed</Text>
                            <Text style={styles.informations}>13.9</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({_favorite: !this.state._favorite})} underlayColor="red">
                            <Image style={styles.favoriteImg} source={this.state._favorite ? favorite : favorite_not_selected} />
                        </TouchableOpacity>
                    </View>
                </View>
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
            </View>
        )
    }
}

export default ActivitySumUp
    
// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    swiper: {
    },
    subcontainer: {
        backgroundColor: '#F2F2F2',
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
    },
    title: {
        margin: 20,
        fontSize: 20,
        color: '#00AEEF',
    },
    informations: {
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: 200,
    },

    details: {
        flexDirection: 'row',
        padding: 20,
        width: '100%',
        justifyContent: 'space-around',
        borderColor: '#DDDDDD',
        borderTopWidth: 1,
    },

    sportImg: {
        height:75,
        width: 75,
        alignSelf: 'flex-start',
    },
    favoriteImg: {
        height:30,
        width: 30,
        alignSelf: 'flex-start',
    }
})