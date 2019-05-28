/* eslint-disable linebreak-style */
/* eslint-disable semi */

import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import history from '../../../assets/userProfil/history.png'
import star from '../../../assets/userProfil/star.png'
import trophy from '../../../assets/userProfil/trophy.png'


export default class UserActivity extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            index: this.props.index // index to know the field (history, field, success)
        }
        this.get_Image.bind(this)
    }

    get_Image(){
        if (this.state.index == 0)
            return trophy
        else if (this.state.index == 1)
            return star
        return history        
    }

    render(){
        return (
            <View style={styles.global_container}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                    <Image style={{width: 50, height: 50}} source={this.get_Image()}></Image>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    global_container: {
        height: 80,
        borderRadius: 15,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        shadowOffset: {width: 1, height: 10},
        shadowColor: 'black',
        shadowRadius: 15,
        shadowOpacity: 1.0,
        flexDirection: 'row',
        elevation: 10
    }
})