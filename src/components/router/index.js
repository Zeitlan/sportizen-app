import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'


import CustomMapView from '../map'
import SportSelector from '../sport-selector'
import Meteo from '../userForm/meteo'
import ConnectionView from '../connection'

const Router = createStackNavigator({
    ConnectionView: {
        screen: ConnectionView,
        navigationOptions: {
            title: 'Login Page',
            header: null //this will hide the header
        },
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
        screen: SportSelector,
        navigationOptions: {
            title: 'Sport Selector',
            header: null //this will hide the header
        },
    },
})


const Tabs = createAppContainer(Router)
export default Tabs