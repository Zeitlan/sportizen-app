/* eslint-disable linebreak-style */

import React from 'react'
import {View, StyleSheet, Image, Text, Dimensions, Animated} from 'react-native'
import {_distance_converter_to_format, _time_converter_to_sec, _convert_second_to_format, _convert_m_sec_to_km_h_format} from './utilities'
import {getBackground} from './utilities'

var screen = Dimensions.get('window')

export default class ActivitySummary extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            heightAnimated : new Animated.Value(0)
        }
    }

    _expandAnimation = () => {
        Animated.timing(this.state.heightAnimated,           
            {
                toValue: 100,                   
                duration: 300,
            }).start(() => {
            this.setState({heightAnimated : new Animated.Value(0)})
        })
    }

    componentDidMount(){
        this._expandAnimation()
    }

    _get_main_container_style = (border_Color) => {
        return {       
            height: 100, 
            backgroundColor: 'white',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 5,
            borderWidth: 0.5,
            borderBottomColor: border_Color
    
        }
    }

    /**
     * return the avegerage value of distance/speed/time for bicycle and running 
     * data is an array with the data we want to treat
     */

    _data_result = (data) => {
        let result_run = {
            speed : 0,
            distance : 0,
            time : 0,
            numbers : 0 // number of occurence
        }

        let result_bicycle = {
            speed : 0,
            distance : 0,
            time : 0,
            numbers: 0
        }

        data.forEach.call(data, (element) => {
            let field_to_update = (element.way_type === 'foot-walking')? result_run : result_bicycle
            field_to_update.distance += element.distance
            const duration_in_sec = _time_converter_to_sec(element.duration)
            field_to_update.time += duration_in_sec
            try{
                field_to_update.speed += element.distance / duration_in_sec // mètres par secondes
            }
            catch(error){
                field_to_update.speed = 0 // div par 0
            }
            field_to_update.numbers += 1

        })
        if (result_run.numbers != 0)
            result_run.speed /= result_run.numbers
        if (result_bicycle.numbers != 0)
            result_bicycle.speed /= result_bicycle.numbers // average speed value    
        return [result_run, result_bicycle]
    }

    render(){
        const result = this._data_result(this.props.data)
        const {indice_array, dateDateLength} = this.props // for border color
        const border_color = getBackground(indice_array, dateDateLength).backgroundColor

        return (
            <Animated.View style={{...styles.main_container, borderColor: border_color, height : this.state.heightAnimated}}>
                <View style={styles.activity_container}>
                    <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>
                        <Image style={styles.image_style} source={require('../../../assets/sport/running-selected.png')}></Image>
                    </View>
                    <View style={{flex : 1.33, alignItems: 'center'}}>
                        <Text style={styles.title_field}> Distance </Text>
                        <Text style={styles.value_field}> {_distance_converter_to_format(result[0].distance)} Km</Text>
                    </View>
                    <View style={styles.horizontal_line}></View>
                    <View style={{flex : 1.33, alignItems: 'center'}}>
                        <Text style={styles.title_field}> Temps </Text>
                        <Text style={styles.value_field}> {_convert_second_to_format(result[0].time)} </Text>
                    </View>
                    <View style={styles.horizontal_line}></View>
                    <View style={{flex : 1.33, alignItems: 'center'}}>
                        <Text style={styles.title_field}> Vitesse </Text>
                        <Text style={styles.value_field}> {_convert_m_sec_to_km_h_format(result[0].speed)} Km/h</Text>
                    </View>
                </View>

                <View style={styles.vertical_line}></View>

                <View style={styles.activity_container}>
                    <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>
                        <Image  style={styles.image_style} source={require('../../../assets/sport/bike-selected.png')}></Image>
                    </View>
                    <View style={{flex : 1.33,  alignItems: 'center'}}>
                        <Text style={styles.title_field}> Distance </Text>
                        <Text style={styles.value_field}> {_distance_converter_to_format(result[1].distance)} Km</Text>
                    </View>
                    <View style={styles.horizontal_line}></View>
                    <View style={{flex : 1.33, alignItems: 'center'}}>
                        <Text style={styles.title_field}> Temps </Text>
                        <Text style={styles.value_field}> {_convert_second_to_format(result[1].time)} </Text>
                    </View>
                    <View style={styles.horizontal_line}></View>
                    <View style={{flex : 1.33, alignItems: 'center'}}>
                        <Text style={styles.title_field}> Vitesse</Text>
                        <Text style={styles.value_field}> {_convert_m_sec_to_km_h_format(result[1].speed)} Km/h</Text>
                    </View>
                </View>
            </Animated.View>
        )
    }


}

const styles = StyleSheet.create({
    
    main_container : {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 0.5,
    },

    activity_container : {
        flex: 1, 
        flexDirection: 'row'
    },
    image_style : {
        height: 32,
        width: 32
    },

    horizontal_line : {
        borderLeftWidth: 1,
        borderLeftColor: '#F1F1F3',
        marginTop: 5,
        marginBottom: 5
    },

    vertical_line: {
        borderBottomColor: '#F1F1F3', 
        borderBottomWidth: 1,
        marginLeft : screen.width * 0.22, 
        marginRight: 10
    },

    title_field : {
        color: 'black', fontSize: 14
    },

    value_field : {
        color: 'gray', fontSize: 10
    }
})
