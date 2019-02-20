import React from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import ConnectionView from './src/components/connection'
import { ContextProvider } from './src/context'

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ContextProvider>
                    <ConnectionView/>
                </ContextProvider>
            </View>
        )
    }
}

// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})