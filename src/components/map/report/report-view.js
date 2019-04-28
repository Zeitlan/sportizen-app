// Dependencies
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

class ReportView extends React.Component {
    
    render() {
        return (
            <View style={styles.informations}>
                <Text>Travaux</Text>
                <Text>le 20 Mars 2019 à 21:30:20</Text>
            </View>)
    }
}

export default ReportView
    
// CSS
const styles = StyleSheet.create({
    informations: {
        width: 200,
    }
})