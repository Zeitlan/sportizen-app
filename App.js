import React from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import CustomMapView from './src/components/map'
import { ContextProvider } from './src/context'

export default class App extends React.Component {
    render() {
        return (
            <ContextProvider>
                <CustomMapView/>
            </ContextProvider>
        )
    }
}

// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})