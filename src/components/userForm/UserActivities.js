import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
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

    get_text(){
        if (this.state.index == 0)
            return 'Afficher mes succès'
        else if (this.state.index == 1)
            return 'Accéder à mes itinéraires favoris'
        return 'Accéder à mon historique d\'activités'  
    }

    render(){
        return (
            <View style={styles.global_container}>
                <View style={styles.image_container}>
                    <Image style={{width: 50, height: 50}} source={this.get_Image()}></Image>
                </View>
                <View style={{borderLeftWidth: 2, borderLeftColor: '#1E90FF', }} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 6}}>
                        <Text style={styles.description}>{this.get_text()}</Text>      
                    </View>          
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Image style={{width: 16, height: 16, marginRight: 5}} source={require('../../../assets/userProfil/arrow-point-to-right.png')}></Image>
                    </View>    
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
    },

    image_container:{
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopLeftRadius: 15, 
        borderBottomLeftRadius: 15, 
        backgroundColor: '#00AEEF', 
        paddingLeft: 5, 
        width: 66
    },

    description:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})