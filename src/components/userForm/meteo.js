/* eslint-disable semi */
import React from 'react'
import { View, StyleSheet, Text, Image} from 'react-native'
import pluie_white from '../../../assets/icons_meteo/pluie_white.png'
import cloud_white from '../../../assets/icons_meteo/cloud_white.png'
import nuage_white from '../../../assets/icons_meteo/nuage_white.png'
import snow_white from '../../../assets/icons_meteo/snow_white.png'
import soleil_white from '../../../assets/icons_meteo/soleil_white.png'
import Thunder_Logo_white from '../../../assets/icons_meteo/Thunder_Logo_white.png'


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
            icon: 0,
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
                }));
                this.getStyleMeteo();
            })    
    }

    getStyleMeteo(){
        var value = this.state.forecast.list[0].weather[0].id;
        if (value == 800)
            this.setState({
                backgroundColor: ColorSun,
                icon: soleil_white,
                api_called: true});
        else if (value == 801)
            this.setState({
                backgroundColor: ColorSunCloud,
                icon: nuage_white,
                api_called: true}); 
        else if (value >= 802)
            this.setState({
                backgroundColor: ColorCloud,
                icon: cloud_white,
                api_called: true});
        else if (value >= 600 && value <= 622) 
            this.setState({
                backgroundColor: ColorCloud,
                icon: snow_white,
                api_called: true});
        else if ((value >= 500 && value <= 531) || (value >= 300 && value <= 321))
            this.setState({
                backgroundColor: ColorRain,
                icon: pluie_white,
                api_called: true});
        else if ((value >= 200 && value <= 232))
            this.setState({
                backgroundColor: ColorThunder,
                icon: Thunder_Logo_white,
                api_called: true});
        else
            this.setState({
                backgroundColor: ColorSun,
                icon: soleil_white,
                api_called: true});                                      
          
    }


    render()
    {
        if (this.state.error != '' || !this.state.api_called)
            return (<Text> loading</Text>)
        return(
            <View style={{backgroundColor: this.state.backgroundColor}}>
                
                <Text style={styles.cityName}>
                    {this.state.forecast.city.name}
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.logoMeteo} source={this.state.icon} resizeMode='contain'></Image>
                    <Text style={styles.temperature}>{this.state.forecast.list[0].main.temp}°C</Text>
                </View>

                <Text style={styles.cityName}>
                    {this.state.forecast.list[0].dt_txt}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cityName: {
        height: 30,
        textAlign: 'center',
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 20
    },

    temperature: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFFFFF',
        alignItems: 'center',
        textAlignVertical: 'center',
        fontSize: 30
    },

    logoMeteo: {
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        alignItems:'center',
        justifyContent:'flex-start',
        width: 80,
        height: 80
    }
})


const ColorSun = '#e5c852';
const ColorSunCloud = '#32bebd';
const ColorCloud = '#999999';
const ColorThunder='#FF0000';
const ColorRain='#090084';