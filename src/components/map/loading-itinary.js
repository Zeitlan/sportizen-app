// Dependencies
import React from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'

class LoadingItinary extends React.Component {

    render() {
        return ( <View style={styles.container}>
            <Text style={{paddingBottom: 20}}>Chargement de l'itinéraire</Text>
            <ActivityIndicator size="large" color="#00AEEF" />
        </View> )
    }
}

export default LoadingItinary
    
// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})