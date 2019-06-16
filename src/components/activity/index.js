// Dependencies
import React from 'react'
import MapView from 'react-native-maps'
import { Polyline } from 'react-native-maps'
import { withContext } from '../../context'
import { View, StyleSheet, Text } from 'react-native'

@withContext(['current_activity'],[])
class ActivitySumUp extends React.Component {
    state = {
        map_view: undefined
    } 

    render() {
        const { state: { current_activity } } = this.props
        let formattedDistance = current_activity.distance
        formattedDistance = formattedDistance.toFixed(2)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Résumé de votre activité</Text>

                <MapView
                    style={styles.map}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    showsBuildings={false}
                    showsTraffic={false}
                    showsIndoors={false}
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
    title: {
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
    },
    map: {
        width: 300,
        height: 300,
    }
})