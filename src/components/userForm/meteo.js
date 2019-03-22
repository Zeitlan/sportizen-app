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
            forecast: [],
            city: '',
            api_called: false
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
                    }), () => { this
                        .getWeather() }
                )
            },
            (error) => this.setState({ forecast: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    getWeather(){

        // Construct the API url to call
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&lang=fr&APPID=79d8299eaf52439691aa531853ba88d1';

        // Call the API, and set the state of the weather forecast
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState((prevState, props) => ({
                    forecast: data,
                    api_called: true
                }));
            })
    }

    render()
    {
        if (this.state.error != '' || !this.state.api_called)
            return (<Text> loading</Text>)

        else
            console.log(this.state.date)    
        return(
            <View>
                <Text style={{marginTop: 20}}>
                    {this.state.forecast.list[0].dt_txt}
                </Text>
                <View>
                    <Text>
                        {this.state.forecast.list[0].main.temp}
                    </Text>
                </View>
            </View>
        )
    }
}

