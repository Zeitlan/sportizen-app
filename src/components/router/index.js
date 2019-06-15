import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'


import CustomMapView from '../map'
import SportSelector from '../sport-selector'
import Meteo from '../userForm/meteo'
import ConnectionView from '../connection'
import SignUpView from '../signup'
import ItinaryView from '../itinary/itinary'
import UserProfilPage from '../userForm/userProfilPage'
import HistoryActivity from '../historyActivity/historyActivity'

const Router = createStackNavigator({
    ConnectionView: {
        screen: ConnectionView,
        navigationOptions: {
            title: 'Login Page',
            header: null //this will hide the header
        },
    },
    SignUpView: {
        screen: SignUpView,
        navigationOptions: {
            title: 'SignUp Page',
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
    ItinaryView: {
        screen: ItinaryView,
        navigationOptions: {
            title: 'Itinary View',
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
    UserProfilPage: {
        screen: UserProfilPage,
        navigationOptions : {
            title: 'User Profil Page',
            header: null // this will hide the header
        }
    },

    HistoryPage: {
        screen: HistoryActivity,
        navigationOptions : {
            title: 'History Actions Page',
            header: null
        }
    }
})


const Tabs = createAppContainer(Router)
export default Tabs