import React from 'react'
import { Text, View, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import logo from '../../../assets/logo.png'
import themeStyle from '../../styles/theme.style';


class ConnectionView extends React.Component {
    state = {
        username: undefined,
        password: undefined
    }
    
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={{flex : 1}} enabled >
                    <View style={styles.divider_img}>
                        <Image source={logo} style={styles.image}/>
                    </View>

                    <View style={styles.form}>                
                            <View style={[styles.divider]}>
                                <TextInput
                                    style={styles.text}
                                    placeholder="Nom d'utilisateur / Mail"
                                    textAlign={'center'}
                                    onChangeText={(username) => this.setState({username})}
                                />
                            </View>
                            <View style={styles.divider}>
                                <TextInput
                                    style={styles.text}
                                    placeholder='Mot de passe'
                                    textAlign={'center'}
                                    onChangeText={(password) => this.setState({password})}
                                />
                            </View>
                    </View>
                </KeyboardAvoidingView>

            </View>
        )
    }
}

export default ConnectionView
    
// CSS
const styles = StyleSheet.create({
    divider_img: {
        flex: 1,
        margin: 5,
        marginTop: 150,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
        flex:3
    },
    text: {
        margin: 20,
        height: 30,
        fontSize: 15,
        borderBottomWidth: 0.4,
        borderBottomColor:'#D3D3D3',
        textAlign: 'center'
    },

    divider: {
        backgroundColor: '#EFEFEF',    
        margin: 15
    }
})