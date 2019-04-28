// Dependencies
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

class ReportForm extends React.Component {
    
    render() {
        const { coordinate } = this.props
        return (
            <View style={styles.informations}>
                <Text>Form here</Text>
            </View>)
    }
}

export default ReportForm
    
// CSS
const styles = StyleSheet.create({
    informations: {
        width: 200,
    }
})