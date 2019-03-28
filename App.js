import React from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import { ContextProvider } from './src/context'
import Tabs   from './src/components/router'

export default class App extends React.Component {
    render() {
        return (
            <ContextProvider>
                <Tabs/>
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