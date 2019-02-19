import React from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import logo from '../../../assets/logo.png'

export default class ConnectionView extends React.Component {
    state = {
        username: undefined,
        password: undefined
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.image}/>
                <View style={styles.form}>
                    <TextInput
                        style={styles.text}
                        placeholder="Nom d'utilisateur / Mail"
                        textAlign={'center'}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder='Mot de passe'
                        textAlign={'center'}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>
            </View>
        )
    }
}
    
// CSS
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
        margin: 5,
        marginTop: 200,
        marginBottom: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex:3
    },
    text: {
        height: 60,
        fontSize: 20,
        textAlign: 'center',
    }
})