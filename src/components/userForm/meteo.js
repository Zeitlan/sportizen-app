/* eslint-disable semi */
import React from 'react'
import { View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Text} from 'react-native'

export default class Meteo extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: '',
            forecast: []
        };
        this.getLocation();
    }
    getLocation(){

        // Get the current position of the user
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState(
                    (prevState) => ({
                        latitude: position.coords.latitude, 
                        longitude: position.coords.longitude
                    }), () => { this.getWeather() }
                )
            },
            (error) => this.setState({ forecast: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        console.log(this.latitude);
        console.log(this.longitude);
    }

    render()
    {
        <Text> salut </Text>
    }
}

