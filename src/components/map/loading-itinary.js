// Dependencies
import React from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { withContext } from '../../context'

@withContext(['current_activity'],[])
class LoadingItinary extends React.Component {

    render() {
        const { state: { current_activity } } = this.props

        if (current_activity.default_path !== undefined) {
            this.props.navigation.navigate('CustomMapView')
        }
        return (
            <View style={styles.container}>

                <Text style={{paddingBottom: 20}}>Chargement de l'itinéraire</Text>
                <ActivityIndicator size="large" color="#00AEEF" />
            </View>
        )
    }
}

export default LoadingItinary
    
// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    }
})