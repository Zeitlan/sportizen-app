/* eslint-disable semi */
import React from 'react'
import { View, StyleSheet, Text} from 'react-native'

export default class Meteo extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: '',
            forecast: [],
            api_called: false,
            icons: '',
            backgroundColor: ''
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

    getStyleMeteo(){
        var value = this.state.forecast.list[0].weather[0].id;
        if (value == 800)
            this.setState({
                backgroundColor: ColorSun,
                icon: 'soleil_white'});
        else if (value == 801)
            this.setState({
                backgroundColor: ColorSunCloud,
                icon: 'nuage_white'}); 
        else if (value >= 802)
            this.setState({
                backgroundColor: ColorCloud,
                icon: ''});
        else if (value >= 600 && value <= 622) 
            this.setState({
                backgroundColor: ColorCloud,
                icon: 'snow_white'});
        else if ((value >= 500 && value <= 531) || (value >= 300 && value <= 321))
            this.setState({
                backgroundColor: ColorRain,
                icon: 'pluie_white'});
        else if ((value >= 200 && value <= 232))
            this.setState({
                backgroundColor: ColorThunder,
                icon: 'Thunder_Logo_white'});
        else
            this.setState({
                backgroundColor: ColorSun,
                icon: 'soleil_white'});                                        
          
    }


    render()
    {
        if (this.state.error != '' || !this.state.api_called)
            return (<Text> loading</Text>)

        else
            console.log(this.state.date)    
        return(
            <View style={{flex: 1}}>
                
                <Text style={styles.cityName}>
                    {this.state.forecast.city.name}
                </Text>

                <Text style={styles.cityName}>
                    {this.state.forecast.list[0].dt_txt}
                </Text>
                <View style={{flex: 1}}>
                    <Text>
                        {this.state.forecast.list[0].main.temp}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cityName: {
        flex: 1,
        textAlign: 'center',
        marginTop: 20,
        color: '#000000',
        fontSize: 20
    }
})

const ColorSun = '#e5c852';
const ColorSunCloud = '#32bebd';
const ColorCloud = '#999999';
const ColorThunder='#FF0000';
const ColorRain='#090084';