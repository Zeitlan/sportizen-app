


import React from 'react'
import {View, Image, StyleSheet, Platform} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

//TODO: Refactor copy/paste

export default ProfileOptions = (props) => {
    if (Platform.OS === 'ios'){
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#F2F2F2'}}>
                <TouchableOpacity style={styles.container_img}>
                    <Image style={{width: 40, height: 40}} source={require('../../../assets/userProfil/sunny.png')}></Image>
                </TouchableOpacity>

                <View style={{ marginLeft: 'auto', marginRight: 'auto', width : 80, height : 80, marginTop: -40,backgroundColor : '#F2F2F2', borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#D3D3D3'}}>
                </View>
                <TouchableOpacity style={styles.container_img}>
                    <Image style={{width: 40, height: 40}} source={require('../../../assets/userProfil/settings.png')}></Image>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#F2F2F2'}}>
            <TouchableOpacity style={{...styles.container_img, marginTop: -20,}}>
                <Image style={{width: 40, height: 40}} source={require('../../../assets/userProfil/sunny.png')}></Image>
            </TouchableOpacity>

            <View style={{ marginLeft: 20, marginRight: 20, width : 80, height : 80, marginTop: -40,backgroundColor : '#F2F2F2', borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#D3D3D3'}}>
            </View>
            <TouchableOpacity style={{...styles.container_img, marginTop: -20,}}>
                <Image style={{width: 40, height: 40}} source={require('../../../assets/userProfil/settings.png')}></Image>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container_img: {
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 10,
        marginBottom: 0
    }
})