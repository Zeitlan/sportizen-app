/* eslint-disable linebreak-style */
/* eslint-disable semi */
import React from 'react'
import { withContext } from '../../context'
import {View, Image, StyleSheet, Text, Animated, Easing} from 'react-native'
import Background from './BackgroundProfil'
import Meteo from './meteo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import themeStyle from '../../styles/theme.style';
import UserActivity from './UserActivities'

export default class UserProfilPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            xValue: new Animated.Value(-1000)
        }
    }

    componentDidMount(){
        this._moveAnimation()
    }

    _moveAnimation = () => {
        Animated.timing(this.state.xValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear
        }).start()
    }

    render(){
        return(
            <View style={{flex : 1}}>
                <Meteo/>
                <View style={{marginTop: 5, flex: 4}}>
                    <Background/>
                    <View style={{backgroundColor: '#F1F1F3', flex: 1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity style={{...styles.container_img, marginRight: 20}}>
                                <Image style={{width: 40, height: 40}} source={require('../../../assets/userProfil/sunny.png')}></Image>
                            </TouchableOpacity>

                            <View style={{width : 80, height : 80, marginTop: -40,backgroundColor : '#FFFFFF', borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#D3D3D3'}}>
                            </View>
                            <TouchableOpacity style={{...styles.container_img, marginLeft: 20}}>
                                <Image style={{width: 40, height: 40}} source={require('../../../assets/userProfil/settings.png')}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{justifyContent: 'center', alignItems: 'center', height: 60}}>
                            <Text style={styles.user_mail}> test@free.fr</Text>
                            <Text style={{color: '#bdbdbd', fontSize: 12}}> débutant </Text>
                        </View>
                        <Animated.View style={[{marginTop: 15}, {left: this.state.xValue}]}>
                            <View>
                                <UserActivity index={0}/>
                            </View>
                            <View style={{marginTop: 15}}>
                                <UserActivity index={1}/>
                            </View>
                            <View style={{marginTop: 15}}>
                                <UserActivity index={2}/>
                            </View>
                        </Animated.View>
                    </View>
                </View>
                <View style={{flex : 1, justifyContent: 'center'}}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container_profil: {
        marginTop: -40, 
        backgroundColor : '#FFFFFF', 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    container_img: {
        marginTop: -20, 
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20
    },

    user_mail : {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
})