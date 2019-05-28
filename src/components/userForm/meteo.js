/* eslint-disable linebreak-style */
/* eslint-disable semi */
import React from 'react'
import { withContext } from '../../context'
import { View, StyleSheet, Text, Image, ActivityIndicator, Alert} from 'react-native'
import themeStyle from '../../styles/theme.style'
import pluie_white from '../../../assets/icons_meteo/pluie_white.png'
import cloud_white from '../../../assets/icons_meteo/cloud_white.png'
import nuage_white from '../../../assets/icons_meteo/nuage_white.png'
import snow_white from '../../../assets/icons_meteo/snow_white.png'
import soleil_white from '../../../assets/icons_meteo/soleil_white.png'
import Thunder_Logo_white from '../../../assets/icons_meteo/Thunder_Logo_white.png'

@withContext(['position', 'weather'],['getWeather'])
class Meteo extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: '',
            icon: 0,
            backgroundColor: ''
        };
        this.mountWeather = this.mountWeather.bind(this)
    }

    getStyleMeteo(){
        const { state: { weather } } = this.props
        const value = weather.list[0].weather[0].id;
        
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

    GetHoursMinute(){
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        
        let str_hours = (hours >= 10)? '' + hours : '0' + hours;
        let str_minutes = (minutes >= 10)? '' + minutes : '0' + minutes;
        console.log(hours + ' ' + minutes)
        console.log(str_hours + ' ' + str_minutes)
        return str_hours + ':' + str_minutes
    }

    async mountWeather() {
        const { actions: { getWeather } } = this.props
        this.setState({api_called: true})
        await getWeather()
        this.getStyleMeteo()
    }

    componentDidMount() {
        this.mountWeather()
    }


    render()
    {
        const { state: { weather } } = this.props
        const { error, backgroundColor, icon} = this.state
        if (error != '')
            return (
                <View style={{alignItems:'center', justifyContent: 'center', height: 50}}>
                    <Text style={{textAlign: 'center'}}>Une erreur est survenue sur l'affichage de la météo: verifiez que vous avez bien activé vos données GPS </Text>
                </View>
            )
            
        else if (weather === undefined)
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', height: 50}}>
                    <ActivityIndicator size='large' color = {themeStyle.PRIMARY_COLOR}/>
                </View>
            )
        
        let hours = this.GetHoursMinute()
        var description = weather.list[0].weather[0].description
        return(
            <View style={{backgroundColor: backgroundColor, paddingTop: 10, borderRadius: 30}}>  
                <Text style={styles.cityName}>
                    {weather.city.name}
                </Text>
                <View style={{borderBottomColor:'#FFFFFF', borderBottomWidth: 1, margin: 15, marginTop: 2, marginBottom: 5}}></View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', flex: 2.5}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={styles.logoMeteo} source={icon} resizeMode='contain'></Image>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={styles.temperature}>{weather.list[0].main.temp}°C</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={styles.description}>{description}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        <View style={{height: 20, flexDirection: 'row', marginTop: 5}}>
                            <Image style={{width: 20, height: 20}} source={require('../../../assets/icons_meteo/clock.png')}/>
                            <Text style={styles.date}>{hours}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Meteo

const styles = StyleSheet.create({
    cityName: {
        height: 30,
        textAlign: 'center',
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 20
    },

    date: {
        color: '#FFFFFF',
        fontSize: 15,
        margin: 5,
        marginTop: 0,
        marginBottom: 0,
        alignSelf: 'center'
    },

    temperature: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 23
    },

    description: {
        textAlign: 'center',
        marginLeft: 5,
        fontSize: 15,
        color: '#FFFFFF'
    },

    logoMeteo: {
        marginLeft: 5,
        width: 60,
        height: 60
    }
})


const ColorSun = '#e5c852';
const ColorSunCloud = '#32bebd';
const ColorCloud = '#999999';
const ColorThunder='#FF0000';
const ColorRain='#87CEEB';
