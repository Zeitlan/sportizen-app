import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'


import CustomMapView from '../map'
import SportSelector from '../sport-selector'
import Meteo from '../userForm/meteo'
import ConnectionView from '../connection'

const Router = createStackNavigator({
    ConnectionView: {
        screen: ConnectionView
    },
    Meteo: {
        screen: Meteo
    },
    CustomMapView: {
        screen: CustomMapView,
        navigationOptions: {
            title: 'Map',
            header: null //this will hide the header
        },
    },
    SportSelector: {
        screen: SportSelector
    },
})


const Tabs = createAppContainer(Router)
export default Tabs