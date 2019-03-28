import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'


import CustomMapView from '../map'
import SportSelector from '../sport-selector'
import Meteo from '../userForm/meteo'

const Router = createBottomTabNavigator({
    Meteo: {
        screen: Meteo
    },
    CustomMapView: {
        screen: CustomMapView
    },
    SportSelector: {
        screen: SportSelector
    },
})


const Tabs = createAppContainer(Router)
export default Tabs